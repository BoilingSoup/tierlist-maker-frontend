import { TierListData } from "../../components/tierlist/types";

export type SetDataArg = TierListData | ((prev: TierListData) => TierListData);
