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
  images: ClientSideImage[];
  onAddImage: (images: ClientSideImage[]) => void;
};

export const ImageArea = ({ images, onAddImage: setImages }: Props) => {
  const { setNodeRef } = useDroppableSidebar();

  const noImages = !images.length;

  return (
    <ImageAreaContainer>
      <SortableContext items={images.map((img) => img.id)}>
        <ImageAreaScrollContainer setNodeRef={setNodeRef}>
          {noImages && <ImageAreaInfo />}

          {images.map((img) => (
            <SortableImage key={img.id} img={img} containerID={SIDEBAR} />
          ))}
        </ImageAreaScrollContainer>
      </SortableContext>
      <Flex sx={addFileButtonAreaSx}>
        <AddFileButton onAddImage={setImages} />
      </Flex>
    </ImageAreaContainer>
  );
};
