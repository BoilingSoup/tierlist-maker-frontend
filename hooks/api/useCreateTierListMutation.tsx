import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { TierListData } from "../../components/tierlist/types";
import { apiClient } from "../../lib/apiClient";
import { useLocalTierListStore } from "../store/useLocalTierListStore";
import { generateFormData } from "../../components/tierlist/helpers";
import { Dispatch, SetStateAction } from "react";

const PRE_POST_REQUEST_MAX_PROGRESS = 66;
const POST_PAYLOAD_RECONSTRUCTION_MAX_PROGRESS = 82;
const ALMOST_COMPLETE_PROGRESS = 90;
const COMPLETE_PROGRESS = 100;

type Param = {
  title: string;
  placeholder: string;
  description?: string;
};

export const useCreateTierListMutation = ({ title, placeholder, description }: Param) => {
  const resetLocalTierList = useLocalTierListStore((state) => state.reset);
  const tierListData = useLocalTierListStore((state) => state.data);

  const router = useRouter();

  const createTierListMutation = useMutation(createTierListRequest, {
    onSuccess: ({ response, requestProgress, setRequestProgress }) => {
      tween(requestProgress, ALMOST_COMPLETE_PROGRESS, 100, (value) => {
        setRequestProgress(value);
      });

      setTimeout(() => {
        router.push(`/tierlist/${response.id}`); // route.push() takes some time to download the necessary data for the route

        tween(requestProgress, COMPLETE_PROGRESS, 50, (value) => {
          setRequestProgress(value);
        });

        setTimeout(() => resetLocalTierList(), 5000); // grace period 5s to reset local tierlist AFTER route view has changed
      }, 200);
    },
  });

  const uploadImagesMutation = useMutation(uploadImages, {
    onSuccess: ({ response, metadata, requestProgress, setRequestProgress }) => {
      const payload = reconstructPayload({ response, metadata, description, placeholder, tierListData, title });

      tween(requestProgress, POST_PAYLOAD_RECONSTRUCTION_MAX_PROGRESS, 100, (value) => {
        setRequestProgress(value);
      });

      createTierListMutation.mutate({ payload, requestProgress, setRequestProgress });
    },
  });

  return [uploadImagesMutation, createTierListMutation] as const;
};

type ReconstructDeps = {
  response: UploadResponse;
  metadata: {
    lengths: { thumbnail: number; sidebar: number; [key: string]: number };
    order: string[];
  };
  title: string;
  placeholder: string;
  tierListData: TierListData;
  description?: string;
};

/**
 * Replaces TierListData image Blobs with src links
 */
function reconstructPayload({
  response,
  metadata,
  title,
  placeholder,
  tierListData,
  description,
}: ReconstructDeps): SaveTierListParam["payload"] {
  const payload: SaveTierListParam["payload"] = {
    title: title.trim() === "" ? placeholder : title.trim(),
    data: JSON.parse(JSON.stringify(tierListData)) as TierListData,
    thumbnail: undefined,
    description,
  };

  const { order, lengths } = metadata;
  let offset = 0;

  for (let id of order) {
    let rowIndex = -1;

    if (id !== "thumbnail" && id !== "sidebar") {
      rowIndex = payload.data.rows.findIndex((row) => row.id.toString() === id);
    }

    for (let i = 0; i < lengths[id]; ++i) {
      switch (id) {
        case "thumbnail":
          payload.thumbnail = response.data[offset + i];
          break;

        case "sidebar":
          payload.data.sidebar[i].src = response.data[offset + i];
          break;

        default:
          if (rowIndex !== -1) {
            payload.data.rows[rowIndex].items[i].src = response.data[offset + i];
          }

          break;
      }
    }
    offset += lengths[id];
  }

  return payload;
}

type SaveTierListResponse = {
  id: string;
  title: string;
  description?: string;
  data: string; // serialized TierListData
  thumbnail: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

type SaveTierListParam = {
  payload: {
    title: string;
    data: TierListData;
    thumbnail?: string;
    description?: string;
  };
  requestProgress: number;
  setRequestProgress: Dispatch<SetStateAction<number>>;
};

async function createTierListRequest({ payload, requestProgress, setRequestProgress }: SaveTierListParam) {
  const res = await apiClient.post<SaveTierListResponse>("/tierlist", payload);
  return { response: res.data, requestProgress, setRequestProgress };
}

type UploadResponse = {
  data: string[];
};

type UploadParam = {
  data: TierListData;
  setHideToolbars: (v: boolean) => void;
  requestProgress: number;
  setRequestProgress: Dispatch<SetStateAction<number>>;
};

async function uploadImages({ data, setHideToolbars, requestProgress, setRequestProgress }: UploadParam) {
  const [formData, metadata] = await generateFormData({ setHideToolbars, data });

  const res = await apiClient.post<UploadResponse>("/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (!e.event.lengthComputable) {
        return;
      }

      const newValue = Math.min(Math.round((e.event.loaded / e.event.total) * 100), PRE_POST_REQUEST_MAX_PROGRESS);

      tween(requestProgress, newValue, 400, (value) => {
        setRequestProgress(value);
      });
    },
  });

  return { response: res.data, metadata: metadata, requestProgress, setRequestProgress };
}

function tween(startValue: number, endValue: number, duration: number, callback: (value: number) => void): void {
  const frameRate = 60; // Assuming 60 frames per second
  const totalFrames = (duration / 1000) * frameRate; // Calculate the total number of frames
  let currentFrame = 0;

  function update() {
    if (currentFrame <= totalFrames) {
      const progress = currentFrame / totalFrames;
      const interpolatedValue = startValue + (endValue - startValue) * progress;
      callback(interpolatedValue);
      currentFrame++;
      requestAnimationFrame(update);
    } else {
      callback(endValue);
    }
  }

  update();
}
