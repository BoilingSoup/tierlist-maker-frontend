import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Box, Flex, Skeleton } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useReducer, useState } from "react";
import { DOM_TO_PNG_ID } from "../../../components/tierlist/constants";
import {
  getDragHandlers,
  GetDragHandlersParam,
  getFullScreenProp,
  getRowHandlers,
  GetRowHandlersParam,
} from "../../../components/tierlist/helpers";
import { useDndSensors } from "../../../components/tierlist/hooks/useDndSensors";
import { useSaveTierListActionHelpers } from "../../../components/tierlist/hooks/useSaveTierListActionHelpers";
import { OverlayImage } from "../../../components/tierlist/image-area/OverlayImage";
import { Sidebar } from "../../../components/tierlist/Sidebar";
import {
  autoAnimateRowContainerSx,
  createPageMainContainerSx,
  rowsContainerSx,
  tierListSkeletonSx,
} from "../../../components/tierlist/styles";
import { TierListRow } from "../../../components/tierlist/TierListRow";
import { ActiveItemState } from "../../../components/tierlist/types";
import { SITE_NAME } from "../../../config/config";
import { useConfirmationOnExitIfUnsavedChanges } from "../../../hooks/api/useConfirmationOnExitIfUnsavedChanges";
import { useGetTierList } from "../../../hooks/api/useGetTierList";

const TierList: NextPage = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string | undefined;

  const fullScreen = useFullscreen();
  const sensors = useDndSensors();
  const [animateChildren] = useAutoAnimate();

  const {
    data,
    setData,
    queryObj: { isLoading },
    diff,
  } = useGetTierList(uuid);

  useConfirmationOnExitIfUnsavedChanges(diff);

  const [activeItem, setActiveItem] = useState<ActiveItemState>(undefined);

  const rowHandler = getRowHandlers({
    setData: setData as GetRowHandlersParam["setData"],
    data,
    disabled: data === undefined,
  });

  const dragHandler = getDragHandlers({
    data,
    setData: setData as GetDragHandlersParam["setData"],
    setActiveItem,
    disabled: data === undefined,
  });

  const [deleteIsToggled, toggleDelete] = useReducer((prev) => !prev, false);

  const saveTierListHelpers = useSaveTierListActionHelpers(data);

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
            {isLoading && <Skeleton sx={tierListSkeletonSx} />}
            <Box ref={animateChildren} id={DOM_TO_PNG_ID} sx={autoAnimateRowContainerSx}>
              {data?.rows.map((row) => (
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
            onOpenSaveMenu={saveTierListHelpers.openSaveMenu}
            onChangeTitle={saveTierListHelpers.changeTitle}
            onChangeDescription={saveTierListHelpers.changeDescription}
            onSave={saveTierListHelpers.save}
            saveModalTitle={saveTierListHelpers.modalTitle}
            titlePlaceholder={saveTierListHelpers.titlePlaceholder}
            showProgressBar={saveTierListHelpers.showProgressBar}
            requestProgress={saveTierListHelpers.requestProgress}
            saveMenuIsOpen={saveTierListHelpers.modalOpened}
            onCloseSaveMenu={saveTierListHelpers.closeModal}
          />
        </Flex>
        <DragOverlay>{activeItem ? <OverlayImage img={activeItem} /> : null}</DragOverlay>
      </DndContext>
    </>
  );
};

export default TierList;
