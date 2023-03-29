import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Box, Flex } from "@mantine/core";
import {
  useFullscreen as useFullScreen,
  useViewportSize,
} from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { NAVBAR_HEIGHT } from "../../components/common/styles";
import {
  CONTAINER,
  initialData,
  SIDEBAR,
} from "../../components/tierlist/constants";
import {
  dispatchDragOverAction,
  getDragOverType,
  getFullScreenProp,
  updateActiveItem,
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
  const { height } = useViewportSize();

  const rowPxHeight: PxSize = isFullScreen
    ? `${height / data.rows.length}px`
    : `${(height - +NAVBAR_HEIGHT.split("px").shift()!) / data.rows.length}px`;

  const [activeItem, setActiveItem] = useState<ActiveItemState>(undefined);

  const dragStartHandler = (event: DragStartEvent) => {
    updateActiveItem({ event, setActiveItem });
  };

  const dragOverHandler = (event: DragOverEvent) => {
    const dragOverType = getDragOverType(event);
    dispatchDragOverAction({ dragOverType, event, data, setData });
  };

  // NOTE: ignore this stuff not done refactoring dragEnd stuff yet.
  //
  // handle moving items within same container.
  // items can be assumed to be in the same container because dragOver updates state before dragEnd when an image is moved cross-container
  // ** over can be the container itself, or an image in the container ** handle both
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) {
      //more defensive programming
      return;
    }

    const activeContainerID = active.data.current?.containerID;
    const overContainerID = over.data.current?.containerID;

    // ** overContainerID is undefined if `over` is a container **
    // i.e. if image is dropped on its current container, it will early return.
    if (activeContainerID !== overContainerID) {
      // defensive programming x 2 i.e. confirm images are in same container before continuing || image is not dropped on the container itself.
      return;
    }

    const overIsContainer =
      over.data.current?.type === CONTAINER ||
      over.data.current?.type === SIDEBAR;
    if (overIsContainer) {
      console.log("dropped on container");
      return;
    }

    // handle when active & over are in sidebar container
    if (activeContainerID === SIDEBAR) {
      const activeIndex = data.sidebar.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = data.sidebar.findIndex((item) => item.id === over.id);

      setData((prev) => {
        return {
          sidebar: arrayMove(prev.sidebar, activeIndex, overIndex),
          rows: prev.rows,
        };
      });
      return;
    }

    // if (activeContainerID === CONTAINER) {
    // TBD: maybe call this a row index .?.?
    const containerIndex = data.rows.findIndex(
      (row) => row.id === activeContainerID
    );
    const activeIndex = data.rows[containerIndex].items.findIndex(
      (item) => item.id === active.id
    );
    const overIndex = data.rows[containerIndex].items.findIndex(
      (item) => item.id === over.id
    );

    setData(
      (prev): TierListData => ({
        sidebar: prev.sidebar,
        rows: prev.rows.map((row) => {
          if (row.id === activeContainerID) {
            return {
              ...row,
              items: arrayMove(row.items, activeIndex, overIndex),
            };
          }
          return row;
        }),
      })
    );
  };

  usePasteEvent(setData);

  const addImageHandler = (newImage: ClientSideImage[]) =>
    setData(
      (prev): TierListData => ({
        sidebar: [...prev.sidebar, ...newImage],
        rows: [...prev.rows],
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
        onDragEnd={handleDragEnd}
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
