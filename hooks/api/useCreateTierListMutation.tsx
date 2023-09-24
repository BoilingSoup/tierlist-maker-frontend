import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { TierListData } from "../../components/tierlist/types";
import { apiClient } from "../../lib/apiClient";

export type SaveTierListPayload = {
  title?: string;
  data: TierListData;
  thumbnail?: string;
  description?: string;
};

export const useCreateTierListMutation = () => {
  const router = useRouter();

  return useMutation((data: SaveTierListPayload) => createTierList(data), {
    onSuccess: (data) => {
      router.push(`/tierlist/${data.id}`, { query: data });
    },
  });
};

export type SaveTierListResponse = {
  id: string;
  title: string;
  description?: string;
  data: string; // serialized TierListData
  thumbnail: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

async function createTierList(data: SaveTierListPayload) {
  const res = await apiClient.post<SaveTierListResponse>("/tierlist", data);
  // console.log(res.data);
  return res.data;
}
