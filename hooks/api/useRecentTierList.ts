import { useQuery } from "react-query";
import { TierList } from "../../lib/types/tierlist";
import apiClient from "../../lib/apiClient";

async function fetchRecentTierLists() {
  const res = await apiClient.get<TierList[]>("/tierlist/recent");
  return res.data;
}

export function useRecentTierList() {
  return useQuery(
    "recent_tier_lists",
    async () => await fetchRecentTierLists(),
    {
      onSuccess: (data) => console.log(data),
      onError: (err) => console.error(err),
    }
  );
}
