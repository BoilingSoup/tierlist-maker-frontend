import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Box, Flex } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { DOM_TO_PNG_ID } from "../../components/tierlist/constants";
import { getDragHandlers, getFullScreenProp, getRowHandlers } from "../../components/tierlist/helpers";
import { useCreateTierListActionHelpers } from "../../components/tierlist/hooks/useCreateTierListActionHelpers";
import { useTierListDomHelpers } from "../../components/tierlist/hooks/useTierListDomHelpers";
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
import { useRecentTierList } from "../../hooks/api/useRecentTierList";

const Create: NextPage = () => {
  useGetInfinitePublicTierLists();
  useGetInfiniteUserTierLists();
  useRecentTierList();

  const { fullScreen, sensors, animateChildren } = useTierListDomHelpers();

  const [data, setData] = [
    useLocalTierListStore((state) => state.data),
    useLocalTierListStore((state) => state.setData),
  ];

  usePasteEvent(setData);

  const [activeItem, setActiveItem] = useState<ActiveItemState>(undefined);
  const rowHandler = getRowHandlers({ setData, data });
  const dragHandler = getDragHandlers({ data, setData, setActiveItem });

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
                  isDeleting={createTierListHelpers.deleteIsToggled}
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
            isDeleting={createTierListHelpers.deleteIsToggled}
            onToggleDelete={createTierListHelpers.toggleDelete}
            fullScreen={getFullScreenProp(fullScreen)}
            data={data}
            onAddImage={rowHandler.addImage}
            onDeleteImage={rowHandler.deleteImage}
            onDeleteAllImages={rowHandler.deleteAllImages}
            onMoveAllImages={rowHandler.moveAllImages}
            onClickSave={createTierListHelpers.openSaveMenu}
            onClickPublish={createTierListHelpers.openPublishMenu}
          />
        </Flex>
        <DragOverlay>{activeItem ? <OverlayImage img={activeItem} /> : null}</DragOverlay>
      </DndContext>
    </>
  );
};

export default Create;
