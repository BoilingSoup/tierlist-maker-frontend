import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Box, Flex } from "@mantine/core";
import { useFullscreen as useFullScreen } from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useReducer, useState } from "react";
import { DOM_TO_PNG_ID } from "../../components/tierlist/constants";
import { getDragHandlers, getFullScreenProp, getRowHandlers } from "../../components/tierlist/helpers";
import { useCreateTierListActionHelpers } from "../../components/tierlist/hooks/useCreateTierListActionHelpers";
import { useDndSensors } from "../../components/tierlist/hooks/useDndSensors";
import { usePasteEvent } from "../../components/tierlist/hooks/usePasteEvent";
import { OverlayImage } from "../../components/tierlist/image-area/OverlayImage";
import { SaveTierListModal } from "../../components/tierlist/SaveTierListModal";
import { Sidebar } from "../../components/tierlist/Sidebar";
import {
  autoAnimateRowContainerSx,
  createPageMainContainerSx,
  rowsContainerSx,
} from "../../components/tierlist/styles";
import { TierListRow } from "../../components/tierlist/TierListRow";
import { ActiveItemState } from "../../components/tierlist/types";
import { SITE_NAME } from "../../config/config";
import { useGetInfinitePublicTierLists } from "../../hooks/api/useGetInfinitePublicTierLists";
import { useGetInfiniteUserTierLists } from "../../hooks/api/useGetInfiniteUserTierLists";
import { useLocalTierListStore } from "../../hooks/store/useLocalTierListStore";

const Create: NextPage = () => {
  useGetInfinitePublicTierLists();
  useGetInfiniteUserTierLists();

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
        <SaveTierListModal
          opened={createTierListHelpers.modalOpened}
          showProgressBar={createTierListHelpers.showProgressBar}
          requestProgress={createTierListHelpers.requestProgress}
          modalTitle={createTierListHelpers.modalTitle}
          tierListTitle={createTierListHelpers.tierListTitle}
          titlePlaceholder={createTierListHelpers.titlePlaceholder}
          onChangeTitle={createTierListHelpers.changeTitle}
          description={createTierListHelpers.description}
          onChangeDescription={createTierListHelpers.changeDescription}
          onSave={createTierListHelpers.save}
          onClose={createTierListHelpers.closeModal}
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
