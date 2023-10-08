import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { TierListData } from "../../components/tierlist/types";
import { useLocalTierListStore } from "../store/useLocalTierListStore";
import { generateFormData, reconstructPayload } from "../../components/tierlist/helpers";
import { Dispatch, SetStateAction } from "react";
import { useServerTierListStore } from "../store/useServerTierListStore";
import { showSomethingWentWrongNotification } from "../../components/common/helpers";
import { useMantineTheme } from "@mantine/core";
import { createTierListRequest, tween, upload } from "./helpers";
import { useAuth } from "../../contexts/AuthProvider";
import { queryKeys } from "../../lib/queryKeys";
import { useRefetchQueries } from "./useRefetchQueries";
import { useResetQueries } from "./useResetQueries";
import { Actions } from "../../components/tierlist/types";

const POST_PAYLOAD_RECONSTRUCTION_MAX_PROGRESS = 70;
const ALMOST_COMPLETE_PROGRESS = 90;
const COMPLETE_PROGRESS = 100;

type Param = {
  title: string;
  placeholder: string;
  description?: string;
  actionType: Actions;
};

export const useCreateTierListMutation = ({ title, placeholder, description, actionType }: Param) => {
  const resetLocalTierList = useLocalTierListStore((state) => state.reset);
  const tierListData = useLocalTierListStore((state) => state.data);
  const addToCache = useServerTierListStore((state) => state.add);

  const router = useRouter();
  const theme = useMantineTheme();

  const { mutate: createTierListMutation, isLoading: isUploading } = useMutation(uploadImages, {
    onSuccess: ({ response, metadata, requestProgress, setRequestProgress }) => {
      const isPublic = actionType === "save" ? false : true;
      const payload = reconstructPayload({
        response,
        metadata,
        description,
        placeholder,
        tierListData,
        title,
        isPublic,
      });

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

  const {
    mutate: postTierListJSONMutation,
    isLoading: isSaving,
    isSuccess,
  } = useMutation(createTierListRequest, {
    onSuccess: async ({ response, requestProgress, setRequestProgress }) => {
      addToCache({ uuid: response.id, response });

      if (response.is_public) {
        resetQueries(queryKeys.publicTierListsIndex());
        refetchQueries(queryKeys.publicTierListsIndex());

        // TODO: refetch recent tier lists
      }

      if (userID !== undefined) {
        resetQueries(queryKeys.userTierLists(userID));
        refetchQueries(queryKeys.userTierLists(userID));
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
