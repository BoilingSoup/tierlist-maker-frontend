import { Button, Center, Flex, Switch, Transition } from "@mantine/core";
import { IconArrowRight, IconTrash } from "@tabler/icons-react";
import { DispatchWithoutAction } from "react";
import { ActionButtonsGroup } from "./ActionButtonsGroup";
import { useToggleDeleteTransitions } from "./hooks/useToggleDeleteTransitions";
import { ImageArea } from "./image-area/ImageArea";
import { modAllImagesContainerSx, sidebarContainerSx, switchStyles } from "./styles";
import { ClientSideImage, FullScreenProp } from "./types";

type Props = {
  isDeleting: boolean;
  onToggleDelete: DispatchWithoutAction;
  images: ClientSideImage[];
  onAddImage: (images: ClientSideImage[]) => void;
  onDeleteImage: (droppableID: string, imgID: string) => void;
  onDeleteAllImages: () => void;
  onMoveAllImages: () => void;
  fullScreen: FullScreenProp;
};

export const Sidebar = ({
  isDeleting,
  onToggleDelete: toggle,
  images,
  onAddImage: setImages,
  fullScreen,
  onDeleteImage: handleDeleteImage,
  onMoveAllImages: handleMoveAllImages,
  onDeleteAllImages: handleDeleteAllImages,
}: Props) => {
  const transitionDuration = 115; // ms

  const { deleteAllVisible, moveAllVisible } = useToggleDeleteTransitions({
    checked: isDeleting,
    duration: transitionDuration,
  });

  return (
    <Flex sx={sidebarContainerSx}>
      <Center sx={modAllImagesContainerSx}>
        <Switch checked={isDeleting} onChange={toggle} label="Toggle Delete" color="red" styles={switchStyles} />
        <Transition
          mounted={deleteAllVisible}
          transition="fade"
          duration={transitionDuration}
          exitDuration={transitionDuration}
          timingFunction="ease"
        >
          {(styles) => (
            <Button color="red.9" style={styles} leftIcon={<IconTrash size={20} />} onClick={handleDeleteAllImages}>
              Delete All
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
            <Button style={styles} color="gray.7" leftIcon={<IconArrowRight />} onClick={handleMoveAllImages}>
              Move All to Sidebar
            </Button>
          )}
        </Transition>
      </Center>
      <ImageArea images={images} onAddImage={setImages} isDeleting={isDeleting} onDelete={handleDeleteImage} />
      <ActionButtonsGroup fullScreen={fullScreen} />
    </Flex>
  );
};
