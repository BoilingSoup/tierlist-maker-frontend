import { useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { useSaveTierListMutation } from "../../../hooks/api/useSaveTierListMutation";
import { useIsExportingStore } from "../../../hooks/store/useIsExportingStore";
import { DiffData, TierListData } from "../types";

type Param = {
  uuid: string | undefined;
  data: TierListData;
  setData: Dispatch<SetStateAction<TierListData>>;
  diff: DiffData;
};

export const useSaveTierListActionHelpers = ({ uuid, data, setData, diff }: Param) => {
  const theme = useMantineTheme();
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const setHideToolbars = useIsExportingStore((state) => state.setValue);

  const [requestProgress, setRequestProgress] = useState(0);

  const { mutate: saveTierListMutation } = useSaveTierListMutation();

  const handleSave = () => {
    setIsSaving(true);

    if (uuid === undefined) {
      return;
    }

    saveTierListMutation({
      data,
      setData,
      diffMetadata: diff.metadata,
      setHideToolbars,
      setIsSaving,
      requestProgress,
      setRequestProgress,
      theme,
      router,
      uuid,
    });
  };

  return { isSaving, handleSave, requestProgress };
};
