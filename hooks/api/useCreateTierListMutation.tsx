import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { TierListData } from "../../components/tierlist/types";
import { apiClient } from "../../lib/apiClient";
import { useLocalTierListStore } from "../store/useLocalTierListStore";

type Param = {
  title: string;
  placeholder: string;
  description?: string;
};

export const useCreateTierListMutation = ({ title, placeholder, description }: Param) => {
  const resetLocalTierList = useLocalTierListStore((state) => state.reset);
  const tierListData = useLocalTierListStore((state) => state.data);

  const router = useRouter();

  const { mutate: createTierListMutation } = useMutation(createTierList, {
    onSuccess: (data) => {
      router.push(`/tierlist/${data.id}`);
      resetLocalTierList();
    },
  });

  return useMutation(uploadImages, {
    onSuccess: (response, { metadata }) => {
      const payload = reconstructPayload({ response, metadata, description, placeholder, tierListData, title });

      createTierListMutation(payload);
    },
  });
};

type ReconstructDeps = {
  response: UploadResponse;
  metadata: UploadParam["metadata"];
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
}: ReconstructDeps): SaveTierListPayload {
  const payload: SaveTierListPayload = {
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

export type SaveTierListResponse = {
  id: string;
  title: string;
  description?: string;
  data: string; // serialized TierListData
  thumbnail: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type SaveTierListPayload = {
  title: string;
  data: TierListData;
  thumbnail?: string;
  description?: string;
};

async function createTierList(data: SaveTierListPayload) {
  const res = await apiClient.post<SaveTierListResponse>("/tierlist", data);
  return res.data;
}

type UploadResponse = {
  data: string[];
};

type UploadParam = {
  formData: FormData;
  readonly metadata: {
    lengths: { thumbnail: number; sidebar: number; [key: string]: number };
    order: (keyof UploadParam["metadata"]["lengths"])[];
  };
};

async function uploadImages({ formData: data }: UploadParam) {
  const res = await apiClient.post<UploadResponse>("/image", data, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (!e.event.lengthComputable) {
        return;
      }

      // TODO: show tweened progress animation while uploading
      console.log(`${Math.min(Math.round((e.event.loaded / e.event.total) * 100), 94)}%`);
    },
  });

  return res.data;
}
