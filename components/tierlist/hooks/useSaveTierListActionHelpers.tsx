import { useDisclosure } from "@mantine/hooks";
import { TierListData } from "../types";

export const useSaveTierListActionHelpers = (data: TierListData) => {
  // const {
  //   title,
  //   handleChangeTitle: changeTitle,
  //   titlePlaceholder,
  //   setTitlePlaceholder,
  //   description,
  //   handleChangeDescription: changeDescription,
  // } = useTierListInfo();

  // const {
  //   opened: modalOpened,
  //   close: closeModal,
  //   handleOpenSaveMenu: openSaveMenu,
  // } = useHandleOpenSaveMenu(setTitlePlaceholder);

  // const {
  //   requestProgress,
  //   isLoading,
  //   handleSave: save,
  // } = useCreateTierListMutationHelpers({
  //   title,
  //   titlePlaceholder,
  //   description,
  //   data,
  // });

  // const modalTitle = isLoading ? "Saving..." : "Save to Account";

  const [opened, { open, close }] = useDisclosure();

  return {
    // openSaveMenu,
    // changeTitle,
    // changeDescription,
    save: open,
    isSaving: opened,
    // modalTitle,
    // titlePlaceholder,
    // showProgressBar: isLoading,
    // requestProgress,
    // modalOpened,
    // closeModal,
  };
};
