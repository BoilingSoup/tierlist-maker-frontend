import { MutableRefObject, useCallback, useRef } from "react";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import { UserTierListsResponse } from "../../components/tierlist/types";
import { useAuth } from "../../contexts/AuthProvider";
import { apiClient } from "../../lib/apiClient";
import { queryKeys } from "../../lib/queryKeys";

export const useGetInfiniteUserTierLists = () => {
  const { user } = useAuth();

  const userAvailable = user !== undefined && user !== null;
  const userID = userAvailable ? user.id : "";

  const query = useInfiniteQuery(
    queryKeys.userTierLists(userID),
    ({ pageParam: cursor }) => fetchUserTierLists(userID, cursor),
    {
      enabled: userAvailable,
      getNextPageParam: (lastPage) => {
        return lastPage.next_cursor;
      },
    }
  );

  const observer = useRef<IntersectionObserver>();
  const lastTierListRef = useLastTierListCallbackRef({ query, observer });

  return { lastTierListRef, query };
};

async function fetchUserTierLists(userID: string, cursor: string = "") {
  const res = await apiClient.get<UserTierListsResponse>(`/user/${userID}/tierlists?cursor=${cursor}`);
  return res.data;
}

type Param = {
  query: UseInfiniteQueryResult<UserTierListsResponse, unknown>;
  observer: MutableRefObject<IntersectionObserver | undefined>;
};

const useLastTierListCallbackRef = ({ query, observer }: Param) => {
  return useCallback(
    (tierListDiv: HTMLDivElement) => {
      if (query.isFetchingNextPage) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((tierLists) => {
        if (tierLists[0].isIntersecting && query.hasNextPage) {
          query.fetchNextPage();
        }
      });

      if (tierListDiv) {
        observer.current.observe(tierListDiv);
      }
    },
    [query.isFetchingNextPage, query.fetchNextPage, query.hasNextPage]
  );
};
