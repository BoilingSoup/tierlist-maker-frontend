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
import { OverlayImage } from "../../../components/tierlist/image-area/OverlayImage";
import { Sidebar } from "../../../components/tierlist/Sidebar";
import { createPageMainContainerSx, rowsContainerSx, tierListSkeletonSx } from "../../../components/tierlist/styles";
import { TierListRow } from "../../../components/tierlist/TierListRow";
import { ActiveItemState } from "../../../components/tierlist/types";
import { SITE_NAME } from "../../../config/config";
import { useGetTierList } from "../../../hooks/api/useGetTierList";

const TierList: NextPage = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string | undefined;

  const {
    data,
    setData,
    queryObj: { isLoading },
  } = useGetTierList(uuid);
  console.log(data);

  const [activeItem, setActiveItem] = useState<ActiveItemState>(undefined);
  const {
    handleMoveRowUp,
    handleMoveRowDown,
    handleChangeLabel,
    handleChangeColor,
    handleAddRowAbove,
    handleAddRowBelow,
    handleDeleteRow,
    handleClearRow,
    handleDeleteImage,
    handleAddImage,
    handleMoveAllImages,
    handleDeleteAllImages,
  } = getRowHandlers({
    setData: setData as GetRowHandlersParam["setData"],
    data,
    disabled: data === undefined,
  });
  const { handleDragStart, handleDragOver, handleDragEnd } = getDragHandlers({
    data,
    setData: setData as GetDragHandlersParam["setData"],
    setActiveItem,
    disabled: data === undefined,
  });

  const fullScreen = useFullscreen();
  const sensors = useDndSensors();
  const [animateChildren] = useAutoAnimate();
  const [deleteIsToggled, toggleDelete] = useReducer((prev) => !prev, false);

  return (
    <>
      <Head>
        <title>Create Tier List</title>
      </Head>
      <DndContext
        id={SITE_NAME}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <Flex sx={createPageMainContainerSx}>
          <Box sx={rowsContainerSx}>
            {isLoading && <Skeleton w="100%" h="100%" sx={tierListSkeletonSx} />}
            <Box ref={animateChildren} id={DOM_TO_PNG_ID} bg="dark.7">
              {data?.rows.map((row) => (
                <TierListRow
                  key={row.id}
                  data={row}
                  deletable={data.rows.length <= 1}
                  isDeleting={deleteIsToggled}
                  onMoveUp={handleMoveRowUp}
                  onMoveDown={handleMoveRowDown}
                  onChangeLabel={handleChangeLabel}
                  onChangeColor={handleChangeColor}
                  onAddRowAbove={handleAddRowAbove}
                  onAddRowBelow={handleAddRowBelow}
                  onDeleteRow={handleDeleteRow}
                  onClearRow={handleClearRow}
                  onDeleteImage={handleDeleteImage}
                />
              ))}
            </Box>
          </Box>
          <Sidebar
            isDeleting={deleteIsToggled}
            onToggleDelete={toggleDelete}
            fullScreen={getFullScreenProp(fullScreen)}
            data={data || { sidebar: [], rows: [] }}
            onAddImage={handleAddImage}
            onDeleteImage={handleDeleteImage}
            onDeleteAllImages={handleDeleteAllImages}
            onMoveAllImages={handleMoveAllImages}
          />
        </Flex>
        <DragOverlay>{activeItem ? <OverlayImage img={activeItem} /> : null}</DragOverlay>
      </DndContext>
    </>
  );
};

export default TierList;
