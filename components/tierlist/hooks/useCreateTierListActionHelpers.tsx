import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useCreateTierListMutation } from "../../../hooks/api/useCreateTierListMutation";
import { useIsExportingStore } from "../../../hooks/store/useIsExportingStore";
import { dateInYyyyMmDdHhMmSs } from "../helpers";
import { TierListData } from "../types";

export const useCreateTierListActionHelpers = (data: TierListData) => {
  const {
    title,
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
    title,
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
    titlePlaceholder,
    showProgressBar: isLoading,
    requestProgress,
    modalOpened,
    closeModal,
  };
};

// internal hooks

const useTierListInfo = () => {
  const [title, setTitle] = useState("");
  const [titlePlaceholder, setTitlePlaceholder] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);

  return { title, handleChangeTitle, titlePlaceholder, setTitlePlaceholder, description, handleChangeDescription };
};

const useHandleOpenSaveMenu = (setTitlePlaceholder: Dispatch<SetStateAction<string>>) => {
  const [opened, { open, close }] = useDisclosure();

  const handleOpenSaveMenu = () => {
    open();
    setTitlePlaceholder(`Untitled - ${dateInYyyyMmDdHhMmSs(new Date())}`);
  };

  return { opened, close, handleOpenSaveMenu };
};

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
