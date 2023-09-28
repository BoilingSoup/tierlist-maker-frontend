import { Button, Center, Flex, Loader, Modal, Progress, Switch, Textarea, TextInput, Transition } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowDown, IconArrowRight, IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import { DispatchWithoutAction, FormEvent, useState } from "react";
import { useCreateTierListMutation } from "../../hooks/api/useCreateTierListMutation";
import { useIsExportingStore } from "../../hooks/store/useIsExportingStore";
import { useIsDesktopScreen } from "../common/hooks/useIsDesktopScreen";
import { ActionButtonsGroup } from "./ActionButtonsGroup";
import { dateInYyyyMmDdHhMmSs } from "./helpers";
import { useToggleDeleteTransitions } from "./hooks/useToggleDeleteTransitions";
import { ImageArea } from "./image-area/ImageArea";
import {
  descriptionInputStyles,
  modAllImagesContainerSx,
  saveModalStyles,
  sidebarContainerSx,
  switchStyles,
  titleInputStyles,
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
  fullScreen: FullScreenProp;
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
}: Props) => {
  const transitionDuration = 115; // ms
  const { deleteAllVisible, moveAllVisible } = useToggleDeleteTransitions({
    checked: isDeleting,
    duration: transitionDuration,
  });

  const isDesktop = useIsDesktopScreen();
  const [opened, { open, close }] = useDisclosure();

  const handleOpenSaveMenu = () => {
    open();
    setTitlePlaceholder(`Untitled - ${dateInYyyyMmDdHhMmSs(new Date())}`);
  };

  const [title, setTitle] = useState("");
  const [titlePlaceholder, setTitlePlaceholder] = useState("");
  const [description, setDescription] = useState("");

  const [{ mutate: createTierListMutation, isLoading: isUploading }, { isLoading: isSaving, isSuccess }] =
    useCreateTierListMutation({
      title,
      placeholder: titlePlaceholder,
      description,
    });

  const setHideToolbars = useIsExportingStore((state) => state.setValue);
  const [requestProgress, setRequestProgress] = useState(0);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    createTierListMutation({ setHideToolbars, data, requestProgress, setRequestProgress });
  };

  const showProgressBar = isUploading || isSaving || isSuccess;

  return (
    <>
      <Modal centered opened={opened} onClose={close} title="Save to Account" styles={saveModalStyles}>
        <form onSubmit={handleSave}>
          <TextInput
            label="Title"
            placeholder={titlePlaceholder}
            styles={titleInputStyles}
            onChange={(e) => setTitle(e.target.value)}
            disabled={showProgressBar}
          />
          <Textarea
            label="Description (optional)"
            styles={descriptionInputStyles}
            onChange={(e) => setDescription(e.target.value)}
            disabled={showProgressBar}
          />
          <Flex justify="space-between" gap="lg">
            <Center w="calc(100% - 100px)">
              {showProgressBar && <Progress h={7} w="100%" mt="lg" striped animate value={requestProgress} />}
            </Center>
            <Button
              type="submit"
              leftIcon={!showProgressBar && <IconDeviceFloppy />}
              display="block"
              mt="lg"
              w="100px"
              disabled={showProgressBar}
              sx={(theme) => ({ ":disabled": { backgroundColor: theme.colors.gray[8] } })}
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
