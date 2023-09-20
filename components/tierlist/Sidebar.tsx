import { Button, Center, Flex, Switch, Transition } from "@mantine/core";
import { IconArrowRight, IconTrash } from "@tabler/icons-react";
import { ChangeEventHandler } from "react";
import { ActionButtonsGroup } from "./ActionButtonsGroup";
import { useToggleDeleteTransitions } from "./hooks/useToggleDeleteTransitions";
import { ImageArea } from "./image-area/ImageArea";
import { modAllImagesContainerSx, sidebarContainerSx, switchStyles } from "./styles";
import { ClientSideImage, FullScreenProp } from "./types";

type Props = {
  images: ClientSideImage[];
  onAddImage: (images: ClientSideImage[]) => void;
  fullScreen: FullScreenProp;
};

export const Sidebar = ({ images, onAddImage: setImages, fullScreen }: Props) => {
  const transitionDuration = 115; // ms
  const { checked, setChecked, deleteAllVisible, moveAllVisible } = useToggleDeleteTransitions(transitionDuration);

  const handleToggle: ChangeEventHandler = (event) => {
    const target = event.target as HTMLInputElement;
    setChecked(target.checked);
  };

  return (
    <Flex sx={sidebarContainerSx}>
      <Center sx={modAllImagesContainerSx}>
        <Switch checked={checked} onChange={handleToggle} label="Toggle Delete" color="red" styles={switchStyles} />
        <Transition
          mounted={deleteAllVisible}
          transition="fade"
          duration={transitionDuration}
          exitDuration={transitionDuration}
          timingFunction="ease"
        >
          {(styles) => (
            <Button color="red.9" style={styles} leftIcon={<IconTrash size={20} />}>
              Delete all
            </Button>
          )}
        </Transition>

        <Transition
          mounted={moveAllVisible}
          transition="fade"
          duration={transitionDuration}
          exitDuration={transitionDuration}
          timingFunction="ease"
        >
          {(styles) => (
            <Button style={styles} color="gray.7" leftIcon={<IconArrowRight />}>
              Move all to sidebar
            </Button>
          )}
        </Transition>
      </Center>
      <ImageArea images={images} onAddImage={setImages} />
      <ActionButtonsGroup fullScreen={fullScreen} />
    </Flex>
  );
};
