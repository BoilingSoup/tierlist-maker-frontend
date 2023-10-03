import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Box, Center, Flex, Progress, Skeleton, Text, useMantineTheme } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useReducer, useState } from "react";
import { NAVBAR_HEIGHT } from "../../../components/common/styles";
import { DOM_TO_PNG_ID } from "../../../components/tierlist/constants";
import { getDragHandlers, getFullScreenProp, getRowHandlers } from "../../../components/tierlist/helpers";
import { useDndSensors } from "../../../components/tierlist/hooks/useDndSensors";
import { usePasteEvent } from "../../../components/tierlist/hooks/usePasteEvent";
import { OverlayImage } from "../../../components/tierlist/image-area/OverlayImage";
import { Sidebar } from "../../../components/tierlist/Sidebar";
import {
  autoAnimateRowContainerSx,
  createPageMainContainerSx,
  rowsContainerSx,
  savingOverlayContainerSx,
  tierListSkeletonSx,
} from "../../../components/tierlist/styles";
import { TierListRow } from "../../../components/tierlist/TierListRow";
import { ActiveItemState } from "../../../components/tierlist/types";
import { SITE_NAME } from "../../../config/config";
import { useConfirmationOnExitIfUnsavedChanges } from "../../../hooks/api/useConfirmationOnExitIfUnsavedChanges";
import { useGetTierList } from "../../../hooks/api/useGetTierList";
import { useSaveTierListMutation } from "../../../hooks/api/useSaveTierListMutation";
import { useIsExportingStore } from "../../../hooks/store/useIsExportingStore";

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

  usePasteEvent(setData);

  useConfirmationOnExitIfUnsavedChanges(diff);

  const [activeItem, setActiveItem] = useState<ActiveItemState>(undefined);

  const rowHandler = getRowHandlers({
    setData: setData,
    data,
    disabled: data === undefined,
  });

  const dragHandler = getDragHandlers({
    data,
    setData: setData,
    setActiveItem,
    disabled: data === undefined,
  });

  const [deleteIsToggled, toggleDelete] = useReducer((prev) => !prev, false);

  // const saveTierListHelpers = useSaveTierListActionHelpers(data);
  const [isSaving, setIsSaving] = useState(false);
  const { mutate: saveTierListMutation } = useSaveTierListMutation();

  const setHideToolbars = useIsExportingStore((state) => state.setValue);
  const [requestProgress, setRequestProgress] = useState(0);
  const theme = useMantineTheme();

  const handleSave = () => {
    setIsSaving(true);

    if (uuid === undefined) {
      return;
    }

    saveTierListMutation({
      data,
      setData,
      diffMetadata: diff.metadata,
      setHideToolbars,
      setIsSaving,
      requestProgress,
      setRequestProgress,
      theme,
      router,
      uuid,
    });
  };

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
        {isSaving && (
          <Center sx={savingOverlayContainerSx}>
            <Text mb={20}>Saving...</Text>
            <Progress h={9} w={"100%"} maw={200} animate striped value={requestProgress} />
          </Center>
        )}
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
            onClickSave={handleSave}
          />
        </Flex>
        <DragOverlay>{activeItem ? <OverlayImage img={activeItem} /> : null}</DragOverlay>
      </DndContext>
    </>
  );
};

export default TierList;
