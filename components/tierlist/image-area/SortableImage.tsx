import { CSS } from "@dnd-kit/utilities";
import { Center, CloseButton, Transition } from "@mantine/core";
import { CSSProperties } from "react";
import { useIsExportingStore } from "../../../hooks/store/useIsExportingStore";
import { useResponsiveImageSize } from "../../../hooks/store/useResponsiveImagesStore";
import { useSortableImage } from "../hooks/useSortableImage";
import { getSidebarImageContainerSx, imageDeleteBtnSx } from "../styles";
import { SortableImageProps } from "../types";

type Props = {
  isDeleting: boolean;
  onDelete: (droppableID: string, imgID: string) => void;
} & SortableImageProps;

export const SortableImage = ({ img, containerID, isDeleting, onDelete: handleDeleteImage }: Props) => {
  const { listeners, attributes, setNodeRef, transform, transition, isDragging } = useSortableImage({
    img,
    containerID,
    disabled: isDeleting,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.2 : 1,
  };

  const size = useResponsiveImageSize((state) => state.size);

  const hideDeleteButtons = useIsExportingStore((state) => state.value);

  return (
    <Center
      key={img.id}
      sx={getSidebarImageContainerSx(size)}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      {!hideDeleteButtons && (
        <Transition mounted={isDeleting} transition="fade">
          {(style) => (
            <CloseButton
              style={style}
              sx={imageDeleteBtnSx}
              size="xl"
              onClick={() => handleDeleteImage(containerID, img.id)}
            />
          )}
        </Transition>
      )}
      <img src={img.src} alt="tier list image item" style={{ width: "100%", objectFit: "cover" }} />
    </Center>
  );
};
