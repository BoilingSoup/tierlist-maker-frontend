import { Button, Center, Flex, Switch, Transition } from "@mantine/core";
import { IconArrowDown, IconArrowRight, IconTrash } from "@tabler/icons-react";
import { DispatchWithoutAction } from "react";
import { useIsDesktopScreen } from "../common/hooks/useIsDesktopScreen";
import { ActionButtonsGroup } from "./ActionButtonsGroup";
import { useToggleDeleteTransitions } from "./hooks/useToggleDeleteTransitions";
import { ImageArea } from "./image-area/ImageArea";
import { modAllImagesContainerSx, sidebarContainerSx, switchStyles } from "./styles";
import { ClientSideImage, FullScreenProp, TierListData } from "./types";

type Props = {
  fullScreen: FullScreenProp;
  isDeleting: boolean;
  onToggleDelete: DispatchWithoutAction;
  data: TierListData;
  onAddImage: (images: ClientSideImage[]) => void;
  onDeleteImage: (droppableID: string, imgID: string) => void;
  onDeleteAllImages: () => void;
  onMoveAllImages: () => void;
  onClickSave: () => void;
  onClickPublish: () => void;
};

export const Sidebar = ({
  isDeleting,
  onToggleDelete: toggle,
  data,
  onAddImage: setImages,
  fullScreen,
  onDeleteImage: handleDeleteImage,
  onMoveAllImages: handleMoveAllImages,
  onDeleteAllImages: handleDeleteAllImages,
  onClickSave: handleClickSave,
  onClickPublish: handleClickPublish
}: Props) => {
  const transitionDuration = 115; // ms
  const { deleteAllVisible, moveAllVisible } = useToggleDeleteTransitions({
    checked: isDeleting,
    duration: transitionDuration,
  });

  const isDesktop = useIsDesktopScreen();

  return (
    <>
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
              <Button
                style={styles}
                color="gray.7"
                leftIcon={isDesktop ? <IconArrowRight /> : <IconArrowDown />}
                onClick={handleMoveAllImages}
              >
                Move All to {isDesktop ? "Sidebar" : "Bottom Bar"}
              </Button>
            )}
          </Transition>
        </Center>
        <ImageArea
          sidebarImages={data.sidebar}
          onAddImage={setImages}
          isDeleting={isDeleting}
          onDelete={handleDeleteImage}
        />
        <ActionButtonsGroup onSave={handleClickSave} onPublish={handleClickPublish} fullScreen={fullScreen} />
      </Flex>
    </>
  );
};
