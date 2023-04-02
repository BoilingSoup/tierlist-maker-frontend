import { Flex } from "@mantine/core";
import { ImageAreaContainer } from "./ImageAreaContainer";
import { ImageAreaInfo } from "./ImageAreaInfo";
import { ImageAreaScrollContainer } from "./ImageAreaScrollContainer";
import { addFileButtonAreaSx } from "../styles";
import { ClientSideImage } from "../types";
import { AddFileButton } from "./AddFileButton";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { SortableImage } from "./SortableImage";
import { CONTAINER, SIDEBAR } from "../constants";

type Props = {
  images: ClientSideImage[];
  onAddImage: (images: ClientSideImage[]) => void;
};

export const ImageArea = ({ images, onAddImage: setImages }: Props) => {
  const noImages = !images.length;

  const { setNodeRef } = useDroppable({
    id: SIDEBAR,
    data: { type: CONTAINER, containerID: SIDEBAR },
  });

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
