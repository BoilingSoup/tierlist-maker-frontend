import { useSortable } from "@dnd-kit/sortable";
import { IMAGE } from "../constants";
import { SortableImageProps } from "../types";

export const useSortableImage = ({ img, containerID }: SortableImageProps) => {
  return useSortable({
    id: img.id,
    data: {
      img,
      containerID,
      type: IMAGE,
    },
  });
};
