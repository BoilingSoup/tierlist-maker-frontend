import { CSS } from "@dnd-kit/utilities";
import { Center, Image } from "@mantine/core";
import { useSortableImage } from "../hooks/useSortableImage";
import { sidebarImageContainerSx } from "../styles";
import { SortableImageProps } from "../types";

export const SortableImage = ({ img, containerID }: SortableImageProps) => {
  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortableImage({ img, containerID });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.2 : 1,
  };

  return (
    <Center
      key={img.id}
      sx={sidebarImageContainerSx}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <Image src={img.src} sx={{ height: "auto", width: "100px" }} />
    </Center>
  );
};
