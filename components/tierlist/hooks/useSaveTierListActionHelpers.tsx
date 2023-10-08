import { useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useReducer, useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { useCloneAndCreateTierListMutation } from "../../../hooks/api/useCloneAndCreateTierListMutation";
import { useSaveTierListMutation } from "../../../hooks/api/useSaveTierListMutation";
import { useIsExportingStore } from "../../../hooks/store/useIsExportingStore";
import { useIsMounted } from "../../common/hooks/useIsMounted";
import { DiffData, TierListData } from "../types";
import { useHandleOpenSaveMenu } from "./useHandleOpenSaveMenu";
import { useTierListInfo } from "./useTierListInfo";

type Param = {
  uuid: string | undefined;
  data: TierListData;
  setData: Dispatch<SetStateAction<TierListData>>;
  diff: DiffData;
  tierListUserID: string;
};

export const useSaveTierListActionHelpers = ({ uuid, data, setData, diff, tierListUserID }: Param) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const { user } = useAuth();

  const [isSaving, setIsSaving] = useState(false);
  const setHideToolbars = useIsExportingStore((state) => state.setValue);

  const [requestProgress, setRequestProgress] = useState(0);

  const {
    title: tierListTitle,
    handleChangeTitle: changeTitle,
    titlePlaceholder,
    setTitlePlaceholder,
    description,
    handleChangeDescription: changeDescription,
  } = useTierListInfo();

  const {
    opened: modalOpened,
    close: closeModal,
    handleOpenSaveMenu: openSaveMenu,
    handleOpenPublishMenu: openPublishMenu,
    actionType,
  } = useHandleOpenSaveMenu(setTitlePlaceholder);

  const { cloneAndCreateTierListMutation, isLoading } = useCloneAndCreateTierListMutation({
    title: tierListTitle,
    placeholder: titlePlaceholder,
    description,
    tierListData: data,
    closeModal,
    actionType,
  });

  const { mutate: saveTierListMutation } = useSaveTierListMutation();

  const saveOwnTierList = () => {
    const isOwner = tierListUserID === user?.id;

    if (uuid === undefined || !isOwner) {
      return;
    }

    setIsSaving(true);
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

  const save = (e: FormEvent) => {
    e.preventDefault();

    cloneAndCreateTierListMutation({
      data,
      requestProgress,
      setRequestProgress,
      setHideToolbars,
    });
  };

  let modalTitle: string;
  if (actionType === "save") {
    modalTitle = isLoading ? "Saving..." : "Save to Account";
  } else {
    modalTitle = isLoading ? "Saving..." : "Save & Publish";
  }

  const isMounted = useIsMounted();
  const showSaveOverlay = isSaving && isMounted;

  const [deleteIsToggled, toggleDelete] = useReducer((prev) => !prev, false);

  return {
    isSaving,
    saveOwnTierList,
    openSaveMenu,
    openPublishMenu,
    requestProgress,
    modalOpened,
    closeModal,
    modalTitle,
    tierListTitle,
    description,
    changeTitle,
    changeDescription,
    titlePlaceholder,
    save,
    showProgressBar: isLoading,
    showSaveOverlay,
    deleteIsToggled,
    toggleDelete,
  };
};
