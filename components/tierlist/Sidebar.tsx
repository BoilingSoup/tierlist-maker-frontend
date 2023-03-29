import { Flex } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { ActionButtonsGroup } from "./ActionButtonsGroup";
import { ImageArea } from "./image-area/ImageArea";
import { sidebarContainerSx } from "./styles";
import { ClientSideImage, FullScreenProp } from "./types";

type Props = {
  imageSources: ClientSideImage[];
  // onAddImage: Dispatch<SetStateAction<ClientSideImage[]>>;
  onAddImage: (images: ClientSideImage[]) => void;
  fullScreen: FullScreenProp;
};

export const Sidebar = ({
  imageSources,
  onAddImage: setImageSources,
  fullScreen,
}: Props) => {
  return (
    <Flex sx={sidebarContainerSx}>
      <ImageArea images={imageSources} onAddImage={setImageSources} />
      <ActionButtonsGroup fullScreen={fullScreen} />
    </Flex>
  );
};
