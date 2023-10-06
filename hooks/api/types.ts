import { UserTierListsResponse } from "../../components/tierlist/types";

export type UploadResponse = {
  data: string[];
};

export type TierListCacheChangeInfo = {
  tierList: UserTierListsResponse["data"][number];
  pageIndex: number;
  tierListIndex: number;
};
