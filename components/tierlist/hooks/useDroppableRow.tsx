import { useDroppable } from "@dnd-kit/core";
import { CONTAINER } from "../constants";

export const useDroppableRow = (id: string) => {
  return useDroppable({
    id,
    data: { type: CONTAINER, containerID: id },
  });
};
