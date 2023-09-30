import { Button, Center, Flex, Loader, Modal, Progress, Switch, Textarea, TextInput, Transition } from "@mantine/core";
import { IconArrowDown, IconArrowRight, IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import { ChangeEventHandler, DispatchWithoutAction, FormEvent } from "react";
import { useIsDesktopScreen } from "../common/hooks/useIsDesktopScreen";
import { ActionButtonsGroup } from "./ActionButtonsGroup";
import { useToggleDeleteTransitions } from "./hooks/useToggleDeleteTransitions";
import { ImageArea } from "./image-area/ImageArea";
import {
  descriptionInputStyles,
  modAllImagesContainerSx,
  saveModalStyles,
  sidebarContainerSx,
  submitSaveButtonSx,
  switchStyles,
  titleInputStyles,
  uploadProgressContainerSx,
} from "./styles";
import { ClientSideImage, FullScreenProp, TierListData } from "./types";

type Props = {
  isDeleting: boolean;
  onToggleDelete: DispatchWithoutAction;
  data: TierListData;
  onAddImage: (images: ClientSideImage[]) => void;
  onDeleteImage: (droppableID: string, imgID: string) => void;
  onDeleteAllImages: () => void;
  onMoveAllImages: () => void;
  onOpenSaveMenu: () => void;
  onChangeTitle: ChangeEventHandler<HTMLInputElement>;
  onChangeDescription: ChangeEventHandler<HTMLTextAreaElement>;
  onSave: (e: FormEvent) => void;
  fullScreen: FullScreenProp;
  saveModalTitle: string;
  titlePlaceholder: string;
  showProgressBar: boolean;
  requestProgress: number;
  saveMenuIsOpen: boolean;
  onCloseSaveMenu: () => void;
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
  onOpenSaveMenu: handleOpenSaveMenu,
  onChangeTitle: handleChangeTitle,
  onChangeDescription: handleChangeDescription,
  onSave: handleSave,
  saveModalTitle,
  titlePlaceholder,
  showProgressBar,
  requestProgress,
  saveMenuIsOpen,
  onCloseSaveMenu: handleCloseSaveMenu,
}: Props) => {
  const transitionDuration = 115; // ms
  const { deleteAllVisible, moveAllVisible } = useToggleDeleteTransitions({
    checked: isDeleting,
    duration: transitionDuration,
  });

  const isDesktop = useIsDesktopScreen();

  return (
    <>
      <Modal
        centered
        opened={saveMenuIsOpen}
        onClose={handleCloseSaveMenu}
        title={saveModalTitle}
        styles={saveModalStyles}
      >
        <form onSubmit={handleSave}>
          <TextInput
            label="Title"
            placeholder={titlePlaceholder}
            styles={titleInputStyles}
            onChange={handleChangeTitle}
            disabled={showProgressBar}
          />
          <Textarea
            label="Description (optional)"
            styles={descriptionInputStyles}
            onChange={handleChangeDescription}
            disabled={showProgressBar}
          />
          <Flex justify="space-between" gap="lg">
            <Center sx={uploadProgressContainerSx}>
              {showProgressBar && <Progress h={7} w="100%" mt="lg" striped animate value={requestProgress} />}
            </Center>
            <Button
              type="submit"
              leftIcon={!showProgressBar && <IconDeviceFloppy />}
              disabled={showProgressBar}
              sx={submitSaveButtonSx}
            >
              {showProgressBar ? <Loader size={23} color="gray.0" /> : "SAVE"}
            </Button>
          </Flex>
        </form>
      </Modal>
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
        <ActionButtonsGroup onSave={handleOpenSaveMenu} fullScreen={fullScreen} />
      </Flex>
    </>
  );
};
