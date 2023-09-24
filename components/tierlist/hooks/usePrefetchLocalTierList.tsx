import { useEffect } from "react";
import { useLocalTierListStore } from "../../../hooks/store/useLocalTierListStore";
import { get } from "idb-keyval";
import { LOCAL_TIERLIST_IDB_KEY } from "../constants";
import { parse } from "valibot";
import { TierListData, TierListSchema } from "../types";

export const usePrefetchLocalTierList = () => {
  useEffect(() => {
    async function getData(): Promise<TierListData | never> {
      const storedData = await get(LOCAL_TIERLIST_IDB_KEY);
      return parse(TierListSchema, storedData) as TierListData; // throws error if it doesn't satisfy schema
    }

    async function setDataFromStorage() {
      try {
        useLocalTierListStore.setState({ data: await getData() });
      } catch (e) {
        // do nothing.
      }
    }

    setDataFromStorage();
  }, []);
};
