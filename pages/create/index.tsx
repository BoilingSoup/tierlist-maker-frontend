import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Box, Flex } from "@mantine/core";
import {
  useFullscreen as useFullScreen,
  useViewportSize,
} from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { append } from "../../components/common/helpers";
import { NAVBAR_HEIGHT } from "../../components/common/styles";
import { initialData } from "../../components/tierlist/constants";
import {
  getDragHandlers,
  getFullScreenProp,
} from "../../components/tierlist/helpers";
import { usePasteEvent } from "../../components/tierlist/hooks/usePasteEvent";
import { OverlayImage } from "../../components/tierlist/image-area/OverlayImage";
import { Sidebar } from "../../components/tierlist/Sidebar";
import { TierListRow } from "../../components/tierlist/TierListRow";
import {
  ActiveItemState,
  ClientSideImage,
  PxSize,
  TierListData,
} from "../../components/tierlist/types";
import { SITE_NAME } from "../../config/config";

const Create: NextPage = () => {
  const fullScreen = useFullScreen();
  const isFullScreen = fullScreen.fullscreen;

  const [data, setData] = useState<TierListData>(initialData);
  const [activeItem, setActiveItem] = useState<ActiveItemState>(undefined);

  const { height } = useViewportSize();
  const rowPxHeight: PxSize = isFullScreen
    ? `${height / data.rows.length}px`
    : `${(height - +NAVBAR_HEIGHT.split("px").shift()!) / data.rows.length}px`;

  usePasteEvent(setData);

  const { dragStartHandler, dragOverHandler, dragEndHandler } = getDragHandlers(
    { data, setData, setActiveItem }
  );

  const addImageHandler = (newImage: ClientSideImage[]) =>
    setData(
      (prev): TierListData => ({
        sidebar: append(prev.sidebar, ...newImage),
        rows: prev.rows,
      })
    );

  return (
    <>
      <Head>
        <title>Create Tier List</title>
      </Head>
      <DndContext
        id={SITE_NAME}
        onDragStart={dragStartHandler}
        onDragOver={dragOverHandler}
        onDragEnd={dragEndHandler}
      >
        <Flex
          ref={fullScreen.ref}
          sx={{
            width: "100%",
            height: `calc(100vh - ${NAVBAR_HEIGHT})`,
          }}
        >
          <Box
            sx={(theme) => ({
              width: "75%",
              backgroundColor: theme.colors.dark[7],
              overflow: "auto",
            })}
          >
            {data.rows.map((row) => (
              <TierListRow key={row.id} data={row} height={rowPxHeight} />
            ))}
          </Box>
          <Sidebar
            fullScreen={getFullScreenProp(fullScreen)}
            images={data.sidebar}
            onAddImage={addImageHandler}
          />
        </Flex>
        <DragOverlay>
          {activeItem ? <OverlayImage img={activeItem} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default Create;
