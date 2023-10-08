import { useMantineTheme } from "@mantine/core";
import { InfiniteData, useMutation, useQueryClient } from "react-query";
import { DataUpdateFunction } from "react-query/types/core/utils";
import { showErrorNotification } from "../../components/common/helpers";
import { UserTierListsResponse } from "../../components/tierlist/types";
import { useAuth } from "../../contexts/AuthProvider";
import { apiClient } from "../../lib/apiClient";
import { queryKeys } from "../../lib/queryKeys";
import { getTierListDataFromCache } from "./helpers";
import { TierListCacheChangeInfo } from "./types";

export const useDeleteTierListMutation = (isPublic: boolean) => {
  const { user } = useAuth();
  const theme = useMantineTheme();
  const queryClient = useQueryClient();

  let deleted: TierListCacheChangeInfo;

  return useMutation(deleteTierList, {
    onSuccess() {
      if (!isPublic) {
        return;
      }
      queryClient.resetQueries(queryKeys.publicTierListsIndex());
      queryClient.refetchQueries(queryKeys.publicTierListsIndex());

      queryClient.resetQueries(queryKeys.recentTierLists());
      queryClient.refetchQueries(queryKeys.recentTierLists());
    },
    onMutate(tierListID) {
      const cacheData = queryClient.getQueryData<InfiniteData<UserTierListsResponse>>(
        queryKeys.userTierLists(user?.id ?? "")
      );
      deleted = getTierListDataFromCache({ cacheData: cacheData!, tierListID })!;

      queryClient.setQueryData<InfiniteData<UserTierListsResponse>>(
        queryKeys.userTierLists(user?.id ?? ""),
        deleteTierListFromCache(tierListID)
      );
    },
    onError() {
      queryClient.setQueryData(queryKeys.userTierLists(user?.id ?? ""), undoDeleteTierListFromCache(deleted));
      showErrorNotification({ theme, message: "Delete failed! Try refreshing the page.", title: "Error" });
    },
  });
};

async function deleteTierList(tierListID: string) {
  const res = await apiClient.delete<void>(`/tierlist/${tierListID}`);
  return res.data;
}

const deleteTierListFromCache = (
  tierListID: string
): DataUpdateFunction<InfiniteData<UserTierListsResponse> | undefined, InfiniteData<UserTierListsResponse>> => {
  return function (prev) {
    if (prev === undefined) {
      return { pageParams: [], pages: [] };
    }

    const copy = JSON.parse(JSON.stringify(prev)) as InfiniteData<UserTierListsResponse>;
    copy.pages = copy.pages.map((page) => ({
      ...page,
      data: page.data.filter((tierList) => tierList.id !== tierListID),
    }));

    return copy;
  };
};

const undoDeleteTierListFromCache = ({
  pageIndex,
  tierListIndex,
  tierList,
}: TierListCacheChangeInfo): DataUpdateFunction<
  InfiniteData<UserTierListsResponse> | undefined,
  InfiniteData<UserTierListsResponse>
> => {
  return function (prev) {
    if (prev === undefined) {
      return { pageParams: [], pages: [] };
    }

    const copy = JSON.parse(JSON.stringify(prev)) as InfiniteData<UserTierListsResponse>;
    copy.pages[pageIndex].data.splice(tierListIndex, 0, tierList);

    return copy;
  };
};
