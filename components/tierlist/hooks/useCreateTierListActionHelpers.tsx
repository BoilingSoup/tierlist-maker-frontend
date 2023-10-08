import { FormEvent, useState } from "react";
import { useCreateTierListMutation } from "../../../hooks/api/useCreateTierListMutation";
import { useIsExportingStore } from "../../../hooks/store/useIsExportingStore";
import { TierListData } from "../types";
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
  });

  const modalTitle = isLoading ? "Saving..." : "Save to Account";

  return {
    openSaveMenu,
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
  };
};

// internal hooks

type CreateTierListMutationHelpersParam = {
  title: string;
  titlePlaceholder: string;
  description?: string;
  data: TierListData;
};

const useCreateTierListMutationHelpers = ({
  title,
  titlePlaceholder,
  description,
  data,
}: CreateTierListMutationHelpersParam) => {
  const { createTierListMutation, isLoading } = useCreateTierListMutation({
    title,
    placeholder: titlePlaceholder,
    description,
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
