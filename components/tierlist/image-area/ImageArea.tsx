import { Center, Flex, Image } from "@mantine/core";
import { ImageAreaContainer } from "./ImageAreaContainer";
import { ImageAreaInfo } from "./ImageAreaInfo";
import { ImageAreaScrollContainer } from "./ImageAreaScrollContainer";
import { addFileButtonAreaSx, sidebarImageContainerSx } from "../styles";
import { ClientSideImage } from "../types";
import { Dispatch, SetStateAction } from "react";
import { AddFileButton } from "./AddFileButton";

type Props = {
  images: ClientSideImage[];
  onAddImage: Dispatch<SetStateAction<ClientSideImage[]>>;
};

export const ImageArea = ({ images, onAddImage: setImageSources }: Props) => {
  const noImages = !images.length;

  return (
    <ImageAreaContainer>
      <ImageAreaScrollContainer>
        {noImages && <ImageAreaInfo />}

        {images.map((img) => (
          <Center key={img.id} sx={sidebarImageContainerSx}>
            <Image src={img.src} sx={{ height: "auto", width: "100px" }} />
          </Center>
        ))}
      </ImageAreaScrollContainer>
      <Flex sx={addFileButtonAreaSx}>
        <AddFileButton onAddImage={setImageSources} />
      </Flex>
    </ImageAreaContainer>
  );
};
