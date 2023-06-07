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
  } = getRowHandlers({
    setData,
    data,
  });
  const { handleDragStart, handleDragOver, handleDragEnd } = getDragHandlers({ data, setData, setActiveItem });

  const sensors = useDndSensors();
  usePasteEvent(setData);
  const [animateChildren] = useAutoAnimate();

  const isDesktopScreen = useIsDesktopScreen();
  const amountOfRowsToPerfectlyFitOnScreen = 5;

  let maxHeight: PxSize;
  let rowHeight: PxSize;

  if (isDesktopScreen) {
    maxHeight = `${(viewportHeight - pxToNumber(NAVBAR_HEIGHT)) / amountOfRowsToPerfectlyFitOnScreen}px`;
    rowHeight = `${(viewportHeight - pxToNumber(NAVBAR_HEIGHT)) / data.rows.length}px`;
  } else {
    maxHeight = `${
      (viewportHeight - pxToNumber(NAVBAR_HEIGHT) - pxToNumber(MOBILE_BOTTOM_BAR)) / amountOfRowsToPerfectlyFitOnScreen
    }px`;
    rowHeight = `${(viewportHeight - pxToNumber(NAVBAR_HEIGHT) - pxToNumber(MOBILE_BOTTOM_BAR)) / data.rows.length}px`;
  }

  // TODO:
  // - authenticated view (hide save/publish buttons)
  // - add row button, delete row button, clear row button
  // - paste event only send network request if text is a valid URL
  // - responsive images dimensions

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
                height={rowHeight}
                maxHeight={maxHeight}
                onMoveUp={handleMoveRowUp}
                onMoveDown={handleMoveRowDown}
                onChangeLabel={handleChangeLabel}
                onChangeColor={handleChangeColor}
                onAddRowAbove={handleAddRowAbove}
                onAddRowBelow={handleAddRowBelow}
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
