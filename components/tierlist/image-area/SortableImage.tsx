import { CSS } from "@dnd-kit/utilities";
import { Center, CloseButton, Transition } from "@mantine/core";
import { CSSProperties } from "react";
import { useResponsiveImageSize } from "../../../hooks/store/useResponsiveImagesStore";
import { useSortableImage } from "../hooks/useSortableImage";
import { getSidebarImageContainerSx, imageDeleteBtnSx } from "../styles";
import { SortableImageProps } from "../types";

export const SortableImage = ({ img, containerID, isDeleting }: SortableImageProps & { isDeleting: boolean }) => {
  const { listeners, attributes, setNodeRef, transform, transition, isDragging } = useSortableImage({
    img,
    containerID,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.2 : 1,
  };

  const size = useResponsiveImageSize((state) => state.size);

  return (
    <Center
      key={img.id}
      sx={getSidebarImageContainerSx(size)}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <Transition mounted={isDeleting} transition="fade">
        {(style) => <CloseButton style={style} sx={imageDeleteBtnSx} size="xl" />}
      </Transition>
      <img src={img.src} style={{ width: "100%", objectFit: "cover" }} />
    </Center>
  );
};
