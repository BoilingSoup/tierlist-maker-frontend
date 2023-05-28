import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Box, CSSObject, Flex, MantineTheme } from "@mantine/core";
import { useFullscreen as useFullScreen, useViewportSize } from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { append, pxToNumber } from "../../components/common/helpers";
import { useIsDesktopScreen } from "../../components/common/hooks/useIsDesktopScreen";
import { NAVBAR_HEIGHT } from "../../components/common/styles";
import { initialData } from "../../components/tierlist/constants";
import { getDragHandlers, getFullScreenProp } from "../../components/tierlist/helpers";
import { usePasteEvent } from "../../components/tierlist/hooks/usePasteEvent";
import { OverlayImage } from "../../components/tierlist/image-area/OverlayImage";
import { Sidebar } from "../../components/tierlist/Sidebar";
import { MOBILE_BOTTOM_BAR } from "../../components/tierlist/styles";
import { TierListRow } from "../../components/tierlist/TierListRow";
import { ActiveItemState, ClientSideImage, PxSize, TierListData } from "../../components/tierlist/types";
import { SITE_NAME } from "../../config/config";

const junk = ({ breakpoints }: MantineTheme): CSSObject => ({
  flexDirection: "column",
  width: "100%",
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  [`@media (min-width: ${breakpoints.lg})`]: {
    flexDirection: "row",
  },
});

const junk2 = ({ colors, breakpoints }: MantineTheme): CSSObject => ({
  width: "100%",
  backgroundColor: colors.dark[7],
  overflow: "auto",
  [`@media (min-width: ${breakpoints.lg})`]: {
    width: "75%",
  },
});

const Create: NextPage = () => {
  const fullScreen = useFullScreen();
  const { height: viewportHeight } = useViewportSize();

  const [data, setData] = useState<TierListData>(initialData);
  const [activeItem, setActiveItem] = useState<ActiveItemState>(undefined);

  usePasteEvent(setData);

  const addImageHandler = (newImage: ClientSideImage[]) =>
    setData(
      (prev): TierListData => ({
        sidebar: append(prev.sidebar, ...newImage),
        rows: prev.rows,
      })
    );

  const { dragStartHandler, dragOverHandler, dragEndHandler } = getDragHandlers({ data, setData, setActiveItem });

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
  // - finish styling mobile view
  //   - tweak add files button
  //   - tweak font sizes
  //   - mobile image area horizontal scroll
  //   - authenticated view (hide save/publish buttons)
  //
  // TODO:
  // - Move rows buttons, add row button, delete row button, change row color, change row title
  // - paste event only send network request if text is a valid URL
  // - responsive images dimensions

  return (
    <>
      <Head>
        <title>Create Tier List</title>
      </Head>
      <DndContext id={SITE_NAME} onDragStart={dragStartHandler} onDragOver={dragOverHandler} onDragEnd={dragEndHandler}>
        <Flex sx={junk}>
          <Box sx={junk2}>
            {data.rows.map((row) => (
              <TierListRow key={row.id} data={row} height={rowHeight} maxHeight={maxHeight} />
            ))}
          </Box>
          <Sidebar fullScreen={getFullScreenProp(fullScreen)} images={data.sidebar} onAddImage={addImageHandler} />
        </Flex>
        <DragOverlay>{activeItem ? <OverlayImage img={activeItem} /> : null}</DragOverlay>
      </DndContext>
    </>
  );
};

export default Create;
