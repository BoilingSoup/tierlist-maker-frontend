import { useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import { showSomethingWentWrongNotification } from "../../components/common/helpers";
import { generateFormData, reconstructPayload } from "../../components/tierlist/helpers";
import { TierListData } from "../../components/tierlist/types";
import { useAuth } from "../../contexts/AuthProvider";
import { queryKeys } from "../../lib/queryKeys";
import { useServerTierListStore } from "../store/useServerTierListStore";
import { createTierListRequest, tween, upload } from "./helpers";
import { useRefetchQueries } from "./useRefetchQueries";
import { useResetQueries } from "./useResetQueries";

type Param = {
  title: string;
  placeholder: string;
  description?: string;
  tierListData: TierListData;
  closeModal: () => void;
};

const POST_PAYLOAD_RECONSTRUCTION_MAX_PROGRESS = 70;
const ALMOST_COMPLETE_PROGRESS = 90;
const COMPLETE_PROGRESS = 100;

export const useCloneAndCreateTierListMutation = ({
  title,
  placeholder,
  description,
  tierListData,
  closeModal,
}: Param) => {
  const theme = useMantineTheme();

  const { mutate: cloneAndCreateTierListMutation, isLoading: isUploading } = useMutation(uploadImages, {
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
  const refetchQueries = useRefetchQueries();
  const resetQueries = useResetQueries();
  const router = useRouter();

  const addToCache = useServerTierListStore((state) => state.add);

  const {
    mutate: postTierListJSONMutation,
    isLoading: isSaving,
    isSuccess,
  } = useMutation(createTierListRequest, {
    onSuccess: async ({ response, requestProgress, setRequestProgress }) => {
      addToCache({ uuid: response.id, response });

      if (userID !== undefined) {
        // TODO: refetch recent tier lists if is_public
        resetQueries(queryKeys.userTierLists(userID));
        refetchQueries(queryKeys.userTierLists(userID));
      }

      tween(requestProgress, ALMOST_COMPLETE_PROGRESS, 100, (value) => {
        setRequestProgress(value);
      });

      setTimeout(() => {
        router.push(`/tierlist/${response.id}`); // route.push() takes some time to download the necessary data for the route
        closeModal();

        tween(requestProgress, COMPLETE_PROGRESS, 50, (value) => {
          setRequestProgress(value);
        });
      }, 200);
    },
    onError: () => {
      showSomethingWentWrongNotification(theme);
    },
  });

  const isLoading = isUploading || isSaving || isSuccess;

  return { cloneAndCreateTierListMutation, isLoading };
};

type UploadParam = {
  data: TierListData;
  setHideToolbars: (v: boolean) => void;
  requestProgress: number;
  setRequestProgress: Dispatch<SetStateAction<number>>;
};

async function uploadImages({ data, setHideToolbars, requestProgress, setRequestProgress }: UploadParam) {
  const [formData, metadata] = await generateFormData({ setHideToolbars, data });

  const res = await upload({ formData, requestProgress, setRequestProgress });

  return { response: res.data, metadata, requestProgress, setRequestProgress };
}
