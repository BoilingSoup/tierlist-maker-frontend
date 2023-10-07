import { MutableRefObject, useCallback, useRef } from "react";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import { UserTierListsResponse } from "../../components/tierlist/types";
import { apiClient } from "../../lib/apiClient";
import { queryKeys } from "../../lib/queryKeys";

export const useGetInfinitePublicTierLists = () => {
  const query = useInfiniteQuery(
    queryKeys.publicTierListsIndex(),
    ({ pageParam: cursor }) => fetchPublicTierLists(cursor),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.next_cursor;
      },
    }
  );

  const observer = useRef<IntersectionObserver>();
  const lastTierListRef = useLastTierListCallbackRef({ query, observer });

  return { lastTierListRef, query };
};

async function fetchPublicTierLists(cursor: string = "") {
  const res = await apiClient.get<UserTierListsResponse>(`/tierlist?cursor=${cursor}`);
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
