import { useQuery } from "react-query";
import { TierListDisplayData } from "../../lib/types/tierlist";
import { apiClient } from "../../lib/apiClient";
import { queryKeys } from "../../lib/queryKeys";

async function fetchRecentTierLists() {
  const res = await apiClient.get<TierListDisplayData[]>("/tierlist/recent");
  return res.data;
}

export function useRecentTierList() {
  return useQuery(queryKeys.recentTierLists(), fetchRecentTierLists);
}
