import { FormEvent, useReducer, useState } from "react";
import { useCreateTierListMutation } from "../../../hooks/api/useCreateTierListMutation";
import { useIsExportingStore } from "../../../hooks/store/useIsExportingStore";
import { Actions, TierListData } from "../types";
import { useHandleOpenSaveMenu } from "./useHandleOpenSaveMenu";
import { useTierListInfo } from "./useTierListInfo";

export const useCreateTierListActionHelpers = (data: TierListData) => {
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
    actionType,
    handleOpenPublishMenu: openPublishMenu,
  } = useHandleOpenSaveMenu(setTitlePlaceholder);

  const {
    requestProgress,
    isLoading,
    handleSave: save,
  } = useCreateTierListMutationHelpers({
    title: tierListTitle,
    titlePlaceholder,
    description,
    data,
    actionType,
  });

  let modalTitle: string;
  if (actionType === "save") {
    modalTitle = isLoading ? "Saving..." : "Save to Account";
  } else {
    modalTitle = isLoading ? "Saving..." : "Save & Publish";
  }
  const [deleteIsToggled, toggleDelete] = useReducer((prev) => !prev, false);

  return {
    openSaveMenu,
    openPublishMenu,
    actionType,
    changeTitle,
    changeDescription,
    save,
    modalTitle,
    tierListTitle,
    description,
    titlePlaceholder,
    showProgressBar: isLoading,
    requestProgress,
    modalOpened,
    closeModal,
    deleteIsToggled,
    toggleDelete,
  };
};

// internal hooks

type CreateTierListMutationHelpersParam = {
  title: string;
  titlePlaceholder: string;
  description?: string;
  data: TierListData;
  actionType: Actions | undefined;
};

const useCreateTierListMutationHelpers = ({
  title,
  titlePlaceholder,
  description,
  data,
  actionType,
}: CreateTierListMutationHelpersParam) => {
  const { createTierListMutation, isLoading } = useCreateTierListMutation({
    title,
    placeholder: titlePlaceholder,
    description,
    actionType,
  });

  const [requestProgress, setRequestProgress] = useState(0);
  const setHideToolbars = useIsExportingStore((state) => state.setValue);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    createTierListMutation({ setHideToolbars, data, requestProgress, setRequestProgress });
  };

  return {
    handleSave,
    isLoading,
    requestProgress,
  };
};
