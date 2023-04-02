import { useDroppable } from "@dnd-kit/core";
import { CONTAINER, SIDEBAR } from "../constants";

export const useDroppableSidebar = () => {
  return useDroppable({
    id: SIDEBAR,
    data: { type: CONTAINER, containerID: SIDEBAR },
  });
};
