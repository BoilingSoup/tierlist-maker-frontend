import { Flex } from "@mantine/core";
import { ActionButtonsGroup } from "./ActionButtonsGroup";
import { ImageArea } from "./image-area/ImageArea";
import { sidebarContainerSx } from "./styles";
import { ClientSideImage, FullScreenProp } from "./types";

type Props = {
  images: ClientSideImage[];
  onAddImage: (images: ClientSideImage[]) => void;
  fullScreen: FullScreenProp;
};

export const Sidebar = ({ images, onAddImage: setImages, fullScreen }: Props) => {
  return (
    <Flex sx={sidebarContainerSx}>
      <ImageArea images={images} onAddImage={setImages} />
      <ActionButtonsGroup fullScreen={fullScreen} />
    </Flex>
  );
};
