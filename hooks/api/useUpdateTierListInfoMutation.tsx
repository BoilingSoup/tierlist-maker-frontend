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

export const useUpdateTierListInfoMutation = () => {
  const { user } = useAuth();
  const theme = useMantineTheme();

  const queryClient = useQueryClient();
  let changed: TierListCacheChangeInfo;

  return useMutation(updateTierListInfo, {
    onSuccess() {
      queryClient.invalidateQueries(queryKeys.userTierLists(user?.id ?? ""));
    },
    onMutate({ tierListID, title, description }) {
      const cacheData = queryClient.getQueryData<InfiniteData<UserTierListsResponse>>(
        queryKeys.userTierLists(user?.id ?? "")
      );

      changed = getTierListDataFromCache({ cacheData: cacheData!, tierListID })!;

      queryClient.setQueryData<InfiniteData<UserTierListsResponse>>(
        queryKeys.userTierLists(user?.id ?? ""),
        updateInfoInCache({ tierListID, title, description })
      );
    },
    onError(_, { setTitle, setDescription }) {
      queryClient.setQueryData(queryKeys.userTierLists(user?.id ?? ""), undoUpdateInfoInCache(changed));
      setTitle(changed.tierList.title);
      setDescription(changed.tierList.description ?? "");
      showErrorNotification({ theme, message: "Update info failed! Try refreshing the page.", title: "Error" });
    },
  });
};

type UpdateTierListInfoParam = {
  tierListID: string;
  title: string;
  description: string;
};

async function updateTierListInfo({
  tierListID,
  title,
  description,
}: UpdateTierListInfoParam & {
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
}) {
  const res = await apiClient.patch<SaveTierListResponse>(`/tierlist/${tierListID}`, { title, description });
  return res.data;
}

function updateInfoInCache({
  tierListID,
  title,
  description,
}: UpdateTierListInfoParam): DataUpdateFunction<
  InfiniteData<UserTierListsResponse> | undefined,
  InfiniteData<UserTierListsResponse>
> {
  return function (prev) {
    if (prev === undefined) {
      return { pageParams: [], pages: [] };
    }

    const copy = JSON.parse(JSON.stringify(prev)) as InfiniteData<UserTierListsResponse>;
    copy.pages = copy.pages.map((page) => ({
      ...page,
      data: page.data.map((tierList) => {
        if (tierList.id === tierListID) {
          tierList.description = description;
          tierList.title = title;
        }
        return tierList;
      }),
    }));

    return copy;
  };
}

function undoUpdateInfoInCache({
  tierList,
  pageIndex,
  tierListIndex,
}: TierListCacheChangeInfo): DataUpdateFunction<
  InfiniteData<UserTierListsResponse> | undefined,
  InfiniteData<UserTierListsResponse>
> {
  return function (prev) {
    if (prev === undefined) {
      return { pageParams: [], pages: [] };
    }

    const copy = JSON.parse(JSON.stringify(prev)) as InfiniteData<UserTierListsResponse>;
    copy.pages[pageIndex].data.splice(tierListIndex, 1, tierList);

    return copy;
  };
}
