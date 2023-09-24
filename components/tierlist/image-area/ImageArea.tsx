import { Flex } from "@mantine/core";
import { ImageAreaContainer } from "./ImageAreaContainer";
import { ImageAreaInfo } from "./ImageAreaInfo";
import { ImageAreaScrollContainer } from "./ImageAreaScrollContainer";
import { addFileButtonAreaSx } from "../styles";
import { ClientSideImage } from "../types";
import { AddFileButton } from "./AddFileButton";
import { SortableContext } from "@dnd-kit/sortable";
import { SortableImage } from "./SortableImage";
import { SIDEBAR } from "../constants";
import { useDroppableSidebar } from "../hooks/useDroppableSidebar";

type Props = {
  sidebarImages: ClientSideImage[];
  onAddImage: (images: ClientSideImage[]) => void;
  isDeleting: boolean;
  onDelete: (droppableID: string, imgID: string) => void;
};

export const ImageArea = ({ sidebarImages, onAddImage: setImages, isDeleting, onDelete: handleDeleteImage }: Props) => {
  const { setNodeRef } = useDroppableSidebar();

  const noSidebarImages = !sidebarImages.length;

  return (
    <ImageAreaContainer>
      <SortableContext items={sidebarImages.map((img) => img.id)}>
        <ImageAreaScrollContainer setNodeRef={setNodeRef}>
          {noSidebarImages && <ImageAreaInfo />}

          {sidebarImages.map((img) => (
            <SortableImage
              key={img.id}
              img={img}
              containerID={SIDEBAR}
              isDeleting={isDeleting}
              onDelete={handleDeleteImage}
            />
          ))}
        </ImageAreaScrollContainer>
      </SortableContext>
      <Flex sx={addFileButtonAreaSx}>
        <AddFileButton onAddImage={setImages} />
      </Flex>
    </ImageAreaContainer>
  );
};
