import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Box, Flex } from "@mantine/core";
import { useFullscreen as useFullScreen } from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { append } from "../../components/common/helpers";
import { DOM_TO_PNG_ID, initialData } from "../../components/tierlist/constants";
import { getDragHandlers, getFullScreenProp, getRowHandlers } from "../../components/tierlist/helpers";
import { useDndSensors } from "../../components/tierlist/hooks/useDndSensors";
import { usePasteEvent } from "../../components/tierlist/hooks/usePasteEvent";
import { OverlayImage } from "../../components/tierlist/image-area/OverlayImage";
import { Sidebar } from "../../components/tierlist/Sidebar";
import { createPageMainContainerSx, rowsContainerSx } from "../../components/tierlist/styles";
import { TierListRow } from "../../components/tierlist/TierListRow";
import { ActiveItemState, ClientSideImage, TierListData } from "../../components/tierlist/types";
import { SITE_NAME } from "../../config/config";

const Create: NextPage = () => {
  const fullScreen = useFullScreen();

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
        <Flex sx={createPageMainContainerSx}>
          <Box sx={rowsContainerSx}>
            <Box ref={animateChildren} id={DOM_TO_PNG_ID} bg="dark.7">
              {data.rows.map((row) => (
                <TierListRow
                  key={row.id}
                  data={row}
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
          </Box>
          <Sidebar fullScreen={getFullScreenProp(fullScreen)} images={data.sidebar} onAddImage={handleAddImage} />
        </Flex>
        <DragOverlay>{activeItem ? <OverlayImage img={activeItem} /> : null}</DragOverlay>
      </DndContext>
    </>
  );
};

export default Create;
