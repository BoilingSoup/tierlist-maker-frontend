import { useMantineTheme } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { InfiniteData, useMutation, useQueryClient } from "react-query";
import { showErrorNotification } from "../../components/common/helpers";
import { SaveTierListResponse, UserTierListsResponse } from "../../components/tierlist/types";
import { useAuth } from "../../contexts/AuthProvider";
import { apiClient } from "../../lib/apiClient";
import { queryKeys } from "../../lib/queryKeys";
import { getTierListDataFromCache } from "./helpers";
import { TierListCacheChangeInfo } from "./types";

export const useSetIsPublicMutation = () => {
  const theme = useMantineTheme();
  const { user } = useAuth();

  const queryClient = useQueryClient();
  let changed: TierListCacheChangeInfo;

  return useMutation(updateIsPublicStatus, {
    onSuccess() {
      queryClient.refetchQueries(queryKeys.userTierLists(user?.id ?? ""));
    },
    onMutate({ tierListID }) {
      const cacheData = queryClient.getQueryData<InfiniteData<UserTierListsResponse>>(
        queryKeys.userTierLists(user?.id ?? "")
      );

      changed = getTierListDataFromCache({ cacheData: cacheData!, tierListID })!;
    },
    onError(_, { setSwitchState }) {
      showErrorNotification({
        theme,
        title: "Error",
        message: "Failed to make tier list public. Try refreshing the page.",
      });
      setSwitchState(changed.tierList.is_public);
    },
  });
};

type UpdateIsPublicParam = {
  is_public: boolean;
  tierListID: string;
  setSwitchState: Dispatch<SetStateAction<boolean>>;
};

async function updateIsPublicStatus({ is_public, tierListID }: UpdateIsPublicParam) {
  const res = await apiClient.patch<SaveTierListResponse>(`/tierlist/${tierListID}/isPublic`, { is_public });
  return res.data;
}
