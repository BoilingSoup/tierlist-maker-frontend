import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Box, Flex } from "@mantine/core";
import { useDisclosure, useFullscreen as useFullScreen } from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useReducer, useState } from "react";
import { DOM_TO_PNG_ID } from "../../components/tierlist/constants";
import {
  dateInYyyyMmDdHhMmSs,
  getDragHandlers,
  getFullScreenProp,
  getRowHandlers,
} from "../../components/tierlist/helpers";
import { useDndSensors } from "../../components/tierlist/hooks/useDndSensors";
import { usePasteEvent } from "../../components/tierlist/hooks/usePasteEvent";
import { OverlayImage } from "../../components/tierlist/image-area/OverlayImage";
import { Sidebar } from "../../components/tierlist/Sidebar";
import { createPageMainContainerSx, rowsContainerSx } from "../../components/tierlist/styles";
import { TierListRow } from "../../components/tierlist/TierListRow";
import { ActiveItemState } from "../../components/tierlist/types";
import { SITE_NAME } from "../../config/config";
import { useCreateTierListMutation } from "../../hooks/api/useCreateTierListMutation";
import { useIsExportingStore } from "../../hooks/store/useIsExportingStore";
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

  const rowHandler = getRowHandlers({
    setData,
    data,
  });

  const dragHandler = getDragHandlers({ data, setData, setActiveItem });

  const [deleteIsToggled, toggleDelete] = useReducer((prev) => !prev, false);

  //
  ////
  const [title, setTitle] = useState("");
  const [titlePlaceholder, setTitlePlaceholder] = useState("");
  const [description, setDescription] = useState("");

  const setHideToolbars = useIsExportingStore((state) => state.setValue);
  const [requestProgress, setRequestProgress] = useState(0);

  const handleOpenSaveMenu = () => {
    open();
    setTitlePlaceholder(`Untitled - ${dateInYyyyMmDdHhMmSs(new Date())}`);
  };

  const [{ mutate: createTierListMutation, isLoading: isUploading }, { isLoading: isSaving, isSuccess }] =
    useCreateTierListMutation({
      title,
      placeholder: titlePlaceholder,
      description,
    });

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    createTierListMutation({ setHideToolbars, data, requestProgress, setRequestProgress });
  };

  const showProgressBar = isUploading || isSaving || isSuccess;

  const modalTitle = showProgressBar ? "Saving..." : "Save to Account";

  const [opened, { open, close }] = useDisclosure();

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
        <Flex sx={createPageMainContainerSx}>
          <Box sx={rowsContainerSx}>
            <Box ref={animateChildren} id={DOM_TO_PNG_ID} bg="dark.7">
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
            onOpenSaveMenu={handleOpenSaveMenu}
            onChangeTitle={(e) => setTitle(e.target.value)}
            onChangeDescription={(e) => setDescription(e.target.value)}
            onSave={handleSave}
            saveModalTitle={modalTitle}
            titlePlaceholder={titlePlaceholder}
            showProgressBar={showProgressBar}
            requestProgress={requestProgress}
            saveMenuIsOpen={opened}
            onCloseSaveMenu={close}
          />
        </Flex>
        <DragOverlay>{activeItem ? <OverlayImage img={activeItem} /> : null}</DragOverlay>
      </DndContext>
    </>
  );
};

export default Create;
