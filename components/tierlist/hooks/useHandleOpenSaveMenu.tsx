import { useDisclosure } from "@mantine/hooks";
import { Dispatch, SetStateAction, useState } from "react";
import { dateInYyyyMmDdHhMmSs } from "../helpers";
import { Actions } from "../types";

export const useHandleOpenSaveMenu = (setTitlePlaceholder: Dispatch<SetStateAction<string>>) => {
  const [opened, { open, close }] = useDisclosure();
  const [actionType, setActionType] = useState<Actions>();

  const createHandler = (type: Actions) => () => {
    setActionType(type);
    open();
    setTitlePlaceholder(`Untitled - ${dateInYyyyMmDdHhMmSs(new Date())}`);
  };

  return {
    opened,
    close,
    handleOpenSaveMenu: createHandler("save"),
    handleOpenPublishMenu: createHandler("publish"),
    actionType,
  };
};
