import { create } from "zustand";
import { INITIAL_STATE, LOCAL_TIERLIST_IDB_KEY } from "../../components/tierlist/constants";
import { TierListData } from "../../components/tierlist/types";
import { set as setIDB } from "idb-keyval";

type SetDataArg = TierListData | ((prev: TierListData) => TierListData);

type TierListStore = {
  data: TierListData;
  setData: (arg: SetDataArg) => Promise<void>;
};

// Save local TierListData state in a global zustand store.
// It is also saved to IndexedDB wen setData(...) is called.
export const useLocalTierListStore = create<TierListStore>((set) => ({
  data: INITIAL_STATE,
  setData: async (arg: SetDataArg) => {
    if (typeof arg !== "function") {
      // console.log("is function");
      set({ data: arg });
      await setIDB(LOCAL_TIERLIST_IDB_KEY, arg);
    } else {
      set((prev) => {
        const newData = arg(prev.data);
        setIDB(LOCAL_TIERLIST_IDB_KEY, newData); // calling setIDB outside of set() writes to IDB twice for some reason? Maybe a bug in zustand.
        return { data: newData };
      });
    }
  },
}));
