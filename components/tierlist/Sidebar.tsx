import { Button, Center, Flex, Switch } from "@mantine/core";
import { ActionButtonsGroup } from "./ActionButtonsGroup";
import { ImageArea } from "./image-area/ImageArea";
import { IMAGE_AREA_CONTAINER_WIDTH, sidebarContainerSx } from "./styles";
import { ClientSideImage, FullScreenProp } from "./types";

type Props = {
  images: ClientSideImage[];
  onAddImage: (images: ClientSideImage[]) => void;
  fullScreen: FullScreenProp;
};

export const Sidebar = ({ images, onAddImage: setImages, fullScreen }: Props) => {
  return (
    <Flex sx={sidebarContainerSx}>
      <Center w={IMAGE_AREA_CONTAINER_WIDTH} m="auto" mt="lg" sx={{ justifyContent: "space-between" }}>
        <Switch
          label="Toggle delete"
          color="red"
          styles={{ thumb: { background: "rgb(180, 0, 0)" }, label: { color: "white" } }}
        />
        <Button>Move all images to sidebar</Button>
        {/* show this only when toggled {<Button>Clear all</Button>} */}
      </Center>
      <ImageArea images={images} onAddImage={setImages} />
      <ActionButtonsGroup fullScreen={fullScreen} />
    </Flex>
  );
};
