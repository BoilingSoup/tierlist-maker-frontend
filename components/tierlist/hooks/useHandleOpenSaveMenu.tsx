import { useDisclosure } from "@mantine/hooks";
import { Dispatch, SetStateAction } from "react";
import { dateInYyyyMmDdHhMmSs } from "../helpers";

export const useHandleOpenSaveMenu = (setTitlePlaceholder: Dispatch<SetStateAction<string>>) => {
  const [opened, { open, close }] = useDisclosure();

  const handleOpenSaveMenu = () => {
    open();
    setTitlePlaceholder(`Untitled - ${dateInYyyyMmDdHhMmSs(new Date())}`);
  };

  return { opened, close, handleOpenSaveMenu };
};
