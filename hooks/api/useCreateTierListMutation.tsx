import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { SaveTierListResponse, TierListData } from "../../components/tierlist/types";
import { apiClient } from "../../lib/apiClient";
import { useLocalTierListStore } from "../store/useLocalTierListStore";
import { generateFormData } from "../../components/tierlist/helpers";
import { Dispatch, SetStateAction } from "react";
import { useServerTierListStore } from "../store/useServerTierListStore";
import { showSomethingWentWrongNotification } from "../../components/common/helpers";
import { useMantineTheme } from "@mantine/core";
import { UploadResponse } from "./types";
import { tween, upload } from "./helpers";
import { useAuth } from "../../contexts/AuthProvider";
import { queryKeys } from "../../lib/queryKeys";

// const PRE_POST_REQUEST_MAX_PROGRESS = 53;
const POST_PAYLOAD_RECONSTRUCTION_MAX_PROGRESS = 70;
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
  const addToCache = useServerTierListStore((state) => state.add);

  const router = useRouter();
  const theme = useMantineTheme();

  const { mutate: createTierListMutation, isLoading: isUploading } = useMutation(uploadImages, {
    onSuccess: ({ response, metadata, requestProgress, setRequestProgress }) => {
      const payload = reconstructPayload({ response, metadata, description, placeholder, tierListData, title });

      tween(requestProgress, POST_PAYLOAD_RECONSTRUCTION_MAX_PROGRESS, 100, (value) => {
        setRequestProgress(value);
      });

      postTierListJSONMutation({ payload, requestProgress, setRequestProgress });
    },
    onError: () => {
      showSomethingWentWrongNotification(theme);
    },
  });

  const { user } = useAuth();
  let userID = user?.id;
  const queryClient = useQueryClient();

  const {
    mutate: postTierListJSONMutation,
    isLoading: isSaving,
    isSuccess,
  } = useMutation(createTierListRequest, {
    onSuccess: async ({ response, requestProgress, setRequestProgress }) => {
      addToCache({ uuid: response.id, response });

      if (userID !== undefined) {
        console.log("hello invalidating queries", userID, queryKeys.userTierLists(userID));
        // TODO: refetch recent tier lists if is_public
        queryClient.refetchQueries(queryKeys.userTierLists(userID));
      }

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
    onError: () => {
      showSomethingWentWrongNotification(theme);
    },
  });

  const isLoading = isUploading || isSaving || isSuccess;

  return { createTierListMutation, isLoading };
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

type UploadParam = {
  data: TierListData;
  setHideToolbars: (v: boolean) => void;
  requestProgress: number;
  setRequestProgress: Dispatch<SetStateAction<number>>;
};

async function uploadImages({ data, setHideToolbars, requestProgress, setRequestProgress }: UploadParam) {
  const [formData, metadata] = await generateFormData({ setHideToolbars, data });

  const res = await upload({ formData, requestProgress, setRequestProgress });

  return { response: res.data, metadata: metadata, requestProgress, setRequestProgress };
}
