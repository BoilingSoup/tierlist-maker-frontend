import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Box, Flex } from "@mantine/core";
import { useFullscreen as useFullScreen, useViewportSize } from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { append, pxToNumber } from "../../components/common/helpers";
import { useIsDesktopScreen } from "../../components/common/hooks/useIsDesktopScreen";
import { NAVBAR_HEIGHT } from "../../components/common/styles";
import { initialData } from "../../components/tierlist/constants";
import { getDragHandlers, getFullScreenProp, getRowHandlers } from "../../components/tierlist/helpers";
import { useDndSensors } from "../../components/tierlist/hooks/useDndSensors";
import { usePasteEvent } from "../../components/tierlist/hooks/usePasteEvent";
import { OverlayImage } from "../../components/tierlist/image-area/OverlayImage";
import { Sidebar } from "../../components/tierlist/Sidebar";
import { createPageMainContainer, MOBILE_BOTTOM_BAR, rowsContainer } from "../../components/tierlist/styles";
import { TierListRow } from "../../components/tierlist/TierListRow";
import { ActiveItemState, ClientSideImage, PxSize, TierListData } from "../../components/tierlist/types";
import { SITE_NAME } from "../../config/config";

const Create: NextPage = () => {
  const fullScreen = useFullScreen();
  const { height: viewportHeight } = useViewportSize();

  const [data, setData] = useState<TierListData>(initialData);
  const [activeItem, setActiveItem] = useState<ActiveItemState>(undefined);

  const handleAddImage = (newImage: ClientSideImage[]) =>
    setData(
      (prev): TierListData => ({
        sidebar: append(prev.sidebar, ...newImage),
        rows: prev.rows,
      })
    );
  const {
    handleMoveRowUp,
    handleMoveRowDown,
    handleChangeLabel,
    handleChangeColor,
    handleAddRowAbove,
    handleAddRowBelow,
    handleDeleteRow,
    handleClearRow,
  } = getRowHandlers({
    setData,
    data,
  });
  const { handleDragStart, handleDragOver, handleDragEnd } = getDragHandlers({ data, setData, setActiveItem });

  const sensors = useDndSensors();
  usePasteEvent(setData);
  const [animateChildren] = useAutoAnimate();

  const isDesktopScreen = useIsDesktopScreen();
  let minHeight: PxSize;
  const rowsToFitPerfectlyOnScreen = 5;

  if (isDesktopScreen) {
    minHeight = `${(viewportHeight - pxToNumber(NAVBAR_HEIGHT)) / rowsToFitPerfectlyOnScreen}px`;
  } else {
    minHeight = `${
      (viewportHeight - pxToNumber(NAVBAR_HEIGHT) - pxToNumber(MOBILE_BOTTOM_BAR)) / rowsToFitPerfectlyOnScreen
    }px`;
  }

  // TODO:
  // - authenticated view (hide save/publish buttons)
  // - paste event only send network request if text is a valid URL

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
        <Flex sx={createPageMainContainer}>
          <Box sx={rowsContainer} ref={animateChildren}>
            {data.rows.map((row) => (
              <TierListRow
                key={row.id}
                data={row}
                minHeight={minHeight}
                deletable={data.rows.length <= 1}
                onMoveUp={handleMoveRowUp}
                onMoveDown={handleMoveRowDown}
                onChangeLabel={handleChangeLabel}
                onChangeColor={handleChangeColor}
                onAddRowAbove={handleAddRowAbove}
                onAddRowBelow={handleAddRowBelow}
                onDeleteRow={handleDeleteRow}
                onClearRow={handleClearRow}
              />
            ))}
          </Box>
          <Sidebar fullScreen={getFullScreenProp(fullScreen)} images={data.sidebar} onAddImage={handleAddImage} />
        </Flex>
        <DragOverlay>{activeItem ? <OverlayImage img={activeItem} /> : null}</DragOverlay>
      </DndContext>
    </>
  );
};

export default Create;
