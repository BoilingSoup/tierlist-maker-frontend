import { useEffect, useState } from "react";
import { TierListData, TierListSchema } from "../types";
import { get, set } from "idb-keyval";
import { parse } from "valibot";
import { INITIAL_STATE } from "../constants";

const LOCAL_TIERLIST_IDB = "lt";

export const useLocallyStoredTierList = () => {
  const [data, _setData] = useState<TierListData>(INITIAL_STATE);

  useEffect(() => {
    async function getData(): Promise<TierListData | never> {
      const storedData = await get(LOCAL_TIERLIST_IDB);
      return parse(TierListSchema, storedData) as TierListData; // throws error if it doesn't satisfy schema
    }

    async function setDataFromStorage() {
      try {
        const storedData = await getData();
        _setData(storedData);
      } catch (e) {
        // do nothing.
      }
    }

    setDataFromStorage();
  }, []);

  async function setData(arg: TierListData | ((prev: TierListData) => TierListData)) {
    let newState: TierListData;

    if (typeof arg !== "function") {
      newState = arg;
    } else {
      newState = arg(data);
    }

    await set(LOCAL_TIERLIST_IDB, newState);
    _setData(newState);
  }

  return [data, setData] as const;
};
