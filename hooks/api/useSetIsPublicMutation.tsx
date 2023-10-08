import { useMantineTheme } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { InfiniteData, useMutation, useQueryClient } from "react-query";
import { DataUpdateFunction } from "react-query/types/core/utils";
import { showErrorNotification } from "../../components/common/helpers";
import { SaveTierListResponse, UserTierListsResponse } from "../../components/tierlist/types";
import { useAuth } from "../../contexts/AuthProvider";
import { apiClient } from "../../lib/apiClient";
import { queryKeys } from "../../lib/queryKeys";
import { getTierListDataFromCache } from "./helpers";
import { TierListCacheChangeInfo } from "./types";

export const useSetIsPublicMutation = (setIsPublic?: Dispatch<SetStateAction<boolean | undefined>>) => {
  const theme = useMantineTheme();
  const { user } = useAuth();

  const queryClient = useQueryClient();
  let changed: TierListCacheChangeInfo;

  return useMutation(updateIsPublicStatus, {
    onSuccess(res) {
      queryClient.resetQueries(queryKeys.publicTierListsIndex());
      queryClient.refetchQueries(queryKeys.publicTierListsIndex());

      queryClient.resetQueries(queryKeys.recentTierLists());
      queryClient.refetchQueries(queryKeys.recentTierLists());

      queryClient.refetchQueries(queryKeys.userTierLists(user?.id ?? ""));

      if (setIsPublic) {
        setIsPublic(res.is_public);
      }
    },
    onMutate({ tierListID, is_public }) {
      const cacheData = queryClient.getQueryData<InfiniteData<UserTierListsResponse>>(
        queryKeys.userTierLists(user?.id ?? "")
      );

      changed = getTierListDataFromCache({ cacheData: cacheData!, tierListID })!;

      queryClient.setQueryData(queryKeys.userTierLists(user?.id ?? ""), setIsPublicInUserCache({ changed, is_public }));
    },
    onError(_, { setSwitchState }) {
      showErrorNotification({
        theme,
        title: "Error",
        message: "Failed to change tier list status. Try refreshing the page.",
      });

      if (setSwitchState) {
        setSwitchState(changed.tierList.is_public);
      }

      queryClient.setQueryData(
        queryKeys.userTierLists(user?.id ?? ""),
        setIsPublicInUserCache({ changed, is_public: changed.tierList.is_public })
      );
    },
  });
};

type UpdateIsPublicParam = {
  is_public: boolean;
  tierListID: string;
  setSwitchState?: Dispatch<SetStateAction<boolean>>;
};

async function updateIsPublicStatus({ is_public, tierListID }: UpdateIsPublicParam) {
  const res = await apiClient.patch<SaveTierListResponse>(`/tierlist/${tierListID}/isPublic`, { is_public });
  return res.data;
}

type SetIsPublicInCacheParam = {
  changed: TierListCacheChangeInfo;
  is_public: boolean;
};

function setIsPublicInUserCache({
  changed,
  is_public,
}: SetIsPublicInCacheParam): DataUpdateFunction<
  InfiniteData<UserTierListsResponse> | undefined,
  InfiniteData<UserTierListsResponse>
> {
  return function (prev) {
    if (prev === undefined) {
      return { pages: [], pageParams: [] };
    }

    const copy = JSON.parse(JSON.stringify(prev)) as InfiniteData<UserTierListsResponse>;
    copy.pages[changed.pageIndex].data[changed.tierListIndex].is_public = is_public;

    return copy;
  };
}
