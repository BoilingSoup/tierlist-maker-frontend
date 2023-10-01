import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Box, Button, Center, Flex, Loader, Modal, Progress, Textarea, TextInput } from "@mantine/core";
import { useFullscreen as useFullScreen } from "@mantine/hooks";
import { IconDeviceFloppy } from "@tabler/icons-react";
import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, FormEvent, useReducer, useState } from "react";
import { DOM_TO_PNG_ID } from "../../components/tierlist/constants";
import { getDragHandlers, getFullScreenProp, getRowHandlers } from "../../components/tierlist/helpers";
import { useCreateTierListActionHelpers } from "../../components/tierlist/hooks/useCreateTierListActionHelpers";
import { useDndSensors } from "../../components/tierlist/hooks/useDndSensors";
import { usePasteEvent } from "../../components/tierlist/hooks/usePasteEvent";
import { OverlayImage } from "../../components/tierlist/image-area/OverlayImage";
import { Sidebar } from "../../components/tierlist/Sidebar";
import {
  autoAnimateRowContainerSx,
  createPageMainContainerSx,
  descriptionInputStyles,
  rowsContainerSx,
  saveModalStyles,
  submitSaveButtonSx,
  titleInputStyles,
  uploadProgressContainerSx,
} from "../../components/tierlist/styles";
import { TierListRow } from "../../components/tierlist/TierListRow";
import { ActiveItemState } from "../../components/tierlist/types";
import { SITE_NAME } from "../../config/config";
import { useLocalTierListStore } from "../../hooks/store/useLocalTierListStore";

const Create: NextPage = () => {
  const fullScreen = useFullScreen();
  const sensors = useDndSensors();
  const [animateChildren] = useAutoAnimate();

  const [data, setData] = [
    useLocalTierListStore((state) => state.data),
    useLocalTierListStore((state) => state.setData),
  ];

  usePasteEvent(setData);

  const [activeItem, setActiveItem] = useState<ActiveItemState>(undefined);
  const rowHandler = getRowHandlers({ setData, data });
  const dragHandler = getDragHandlers({ data, setData, setActiveItem });

  const [deleteIsToggled, toggleDelete] = useReducer((prev) => !prev, false);

  const createTierListHelpers = useCreateTierListActionHelpers(data);

  return (
    <>
      <Head>
        <title>Create Tier List</title>
      </Head>
      <DndContext
        id={SITE_NAME}
        onDragStart={dragHandler.start}
        onDragOver={dragHandler.over}
        onDragEnd={dragHandler.end}
        sensors={sensors}
      >
        <SaveImageModal
          opened={createTierListHelpers.modalOpened}
          title={createTierListHelpers.modalTitle}
          titlePlaceholder={createTierListHelpers.titlePlaceholder}
          showProgressBar={createTierListHelpers.showProgressBar}
          requestProgress={createTierListHelpers.requestProgress}
          onSave={createTierListHelpers.save}
          onClose={createTierListHelpers.closeModal}
          onChangeDescription={createTierListHelpers.changeDescription}
          onChangeTitle={createTierListHelpers.changeTitle}
        />
        <Flex sx={createPageMainContainerSx}>
          <Box sx={rowsContainerSx}>
            <Box ref={animateChildren} id={DOM_TO_PNG_ID} sx={autoAnimateRowContainerSx}>
              {data.rows.map((row) => (
                <TierListRow
                  key={row.id}
                  data={row}
                  deletable={data.rows.length <= 1}
                  isDeleting={deleteIsToggled}
                  onMoveUp={rowHandler.moveRowUp}
                  onMoveDown={rowHandler.moveRowDown}
                  onChangeLabel={rowHandler.changeLabel}
                  onChangeColor={rowHandler.changeColor}
                  onAddRowAbove={rowHandler.addRowAbove}
                  onAddRowBelow={rowHandler.addRowBelow}
                  onDeleteRow={rowHandler.deleteRow}
                  onClearRow={rowHandler.clearRow}
                  onDeleteImage={rowHandler.deleteImage}
                />
              ))}
            </Box>
          </Box>
          <Sidebar
            isDeleting={deleteIsToggled}
            onToggleDelete={toggleDelete}
            fullScreen={getFullScreenProp(fullScreen)}
            data={data}
            onAddImage={rowHandler.addImage}
            onDeleteImage={rowHandler.deleteImage}
            onDeleteAllImages={rowHandler.deleteAllImages}
            onMoveAllImages={rowHandler.moveAllImages}
            onClickSave={createTierListHelpers.openSaveMenu}
          />
        </Flex>
        <DragOverlay>{activeItem ? <OverlayImage img={activeItem} /> : null}</DragOverlay>
      </DndContext>
    </>
  );
};

export default Create;

type SaveImageModalProps = {
  opened: boolean;
  onClose: () => void;
  title: string;
  titlePlaceholder: string;
  requestProgress: number;
  showProgressBar: boolean;
  onSave: (e: FormEvent) => void;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const SaveImageModal = ({
  opened,
  title,
  titlePlaceholder,
  requestProgress,
  showProgressBar,
  onClose: handleClose,
  onSave: handleSave,
  onChangeTitle: handleChangeTitle,
  onChangeDescription: handleChangeDescription,
}: SaveImageModalProps) => {
  return (
    <Modal centered opened={opened} onClose={handleClose} title={title} styles={saveModalStyles}>
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
  );
};
