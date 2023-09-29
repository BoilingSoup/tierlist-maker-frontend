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
import { hashString } from "../../components/tierlist/helpers";

// Checks cache first to avoid unnecessary queries.
// Using a zustand store because cache has additional derived data that is only relevant on the client.
export const useGetTierList = (uuid: string | undefined) => {
  const theme = useMantineTheme();
  const router = useRouter();

  const [data, setData] = useState<TierListData>();

  const cacheHit = useCheckServerCache({ uuid, setData });
  const enabled = uuid !== undefined && !cacheHit;

  const addToCache = useServerTierListStore((state) => state.add);

  const queryObj = useQuery(queryKeys.tierList(uuid!), getTierList(uuid!), {
    cacheTime: 0, // get latest data from server every time
    staleTime: 0,
    enabled,
    onSuccess: async (response) => {
      try {
        const tierListData = parse(TierListSchema, JSON.parse(response.data)); // throws error if it doesn't satisfy schema
        const dataHash = await hashString(response.data);

        addToCache({ response, uuid: response.id, dataHash });
        setData(tierListData);
      } catch (e) {
        showSomethingWentWrongNotification(theme);
        router.push("/");
      }
    },
    onError: () => {
      router.push("/404");
    },
  });

  const currentHash = useCurrentHash(data);

  return { data, setData, queryObj, currentHash };
};

function getTierList(id: string) {
  return async function () {
    const res = await apiClient.get<SaveTierListResponse>(`/tierlist/${id}`);
    return res.data;
  };
}

type CheckServerCacheParam = {
  uuid: string | undefined;
  setData: Dispatch<SetStateAction<TierListData | undefined>>;
};

const useCheckServerCache = ({ uuid, setData }: CheckServerCacheParam): boolean => {
  const router = useRouter();
  const theme = useMantineTheme();

  const serverCache = useServerTierListStore((state) => state.responses);

  const [cacheHit, setCacheHit] = useState(true);

  useEffect(() => {
    if (uuid === undefined) {
      return;
    }
    const cached = serverCache[uuid];

    if (cached !== undefined) {
      setCacheHit(true);

      try {
        const tierListData = parse(TierListSchema, JSON.parse(serverCache[uuid].response.data));
        setData(tierListData);
      } catch (e) {
        // TODO: double check. should never get here, but check if this is appropriate handling.
        showSomethingWentWrongNotification(theme);
        router.push("/");
      }

      return;
    } else {
      setCacheHit(false);
    }
  }, [uuid]);

  return cacheHit;
};

/**
 * Computes hash of the current tierlist on the client. Hash is recalculated as changes are made.
 */
const useCurrentHash = (data: TierListData | undefined) => {
  return useQuery([data], () => hashString(JSON.stringify(data)), {
    enabled: data !== undefined,
    cacheTime: 0,
    staleTime: 0,
  });
};
