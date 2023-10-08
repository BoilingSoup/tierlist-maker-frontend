import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { SaveTierListResponse, TierListData, TierListSchema } from "../../components/tierlist/types";
import { apiClient } from "../../lib/apiClient";
import { queryKeys } from "../../lib/queryKeys";
import { parse } from "valibot";
import { showSomethingWentWrongNotification } from "../../components/common/helpers";
import { useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { useServerTierListStore } from "../store/useServerTierListStore";
import { checkForDiff } from "../../components/tierlist/helpers";

// Checks cache first to avoid unnecessary queries.
// Using a zustand store because cache has additional derived data that is only relevant on the client.
export const useGetTierList = (uuid: string | undefined) => {
  const theme = useMantineTheme();
  const router = useRouter();

  const [data, setData] = useState<TierListData>({ sidebar: [], rows: [] });
  const [tierListUserID, setTierListUserID] = useState("");

  const { cacheHit, serverData, setServerData } = useCheckServerCacheStore({ uuid, setData, setTierListUserID });
  console.log({ cacheHit });

  const queryObj = useQuery(queryKeys.tierList(uuid!), getTierList(uuid!), {
    enabled: uuid !== undefined && !cacheHit,
    cacheTime: 0,
    staleTime: 0,
    onSuccess: (response) => {
      try {
        let tierListData: TierListData;
        if (typeof response.data === "string") {
          tierListData = parse(TierListSchema, JSON.parse(response.data)); // throws error if it doesn't satisfy schema
        } else {
          tierListData = response.data;
        }
        setServerData(tierListData);
        setData(tierListData);
        setTierListUserID(response.user_id);
      } catch (e) {
        showSomethingWentWrongNotification(theme);
        router.push("/");
      }
    },
    onError: () => {
      router.push("/404");
    },
  });

  const diff = checkForDiff({ clientData: data, serverData });

  return { data, setData, queryObj, diff, tierListUserID };
};

function getTierList(id: string) {
  return async function () {
    const res = await apiClient.get<SaveTierListResponse>(`/tierlist/${id}`);
    return res.data;
  };
}

type CheckServerCacheParam = {
  uuid: string | undefined;
  setData: Dispatch<SetStateAction<TierListData>>;
  setTierListUserID: Dispatch<SetStateAction<string>>;
};

const useCheckServerCacheStore = ({ uuid, setData, setTierListUserID }: CheckServerCacheParam) => {
  const theme = useMantineTheme();
  const router = useRouter();

  const [cacheHit, setCacheHit] = useState(true);

  const serverCacheStore = useServerTierListStore((state) => state.responses);
  const [serverData, setServerData] = useState<TierListData>();

  useEffect(() => {
    if (uuid === undefined) {
      return;
    }
    const cached = serverCacheStore[uuid];

    if (cached !== undefined) {
      setCacheHit(true);
      setTierListUserID(cached.response.user_id);
      try {
        let tierListData: TierListData;

        if (typeof cached.response.data === "string") {
          tierListData = parse(TierListSchema, JSON.parse(cached.response.data));
        } else {
          tierListData = cached.response.data;
        }

        setServerData(tierListData);
        setData(tierListData);
      } catch (e) {
        showSomethingWentWrongNotification(theme);
        router.push("/");
      }
    } else {
      setCacheHit(false);
    }
  }, [uuid, serverCacheStore]);

  return { cacheHit, serverData, setServerData };
};
