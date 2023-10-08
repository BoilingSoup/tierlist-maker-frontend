import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Box, Center, Flex, Progress, Skeleton, Text } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { DOM_TO_PNG_ID, PORTAL_TARGET_ID } from "../../../components/tierlist/constants";
import { getDragHandlers, getFullScreenProp, getRowHandlers } from "../../../components/tierlist/helpers";
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
import { useSaveTierListActionHelpers } from "../../../components/tierlist/hooks/useSaveTierListActionHelpers";
import { createPortal } from "react-dom";
import { useGetInfinitePublicTierLists } from "../../../hooks/api/useGetInfinitePublicTierLists";
import { useGetInfiniteUserTierLists } from "../../../hooks/api/useGetInfiniteUserTierLists";
import { SaveTierListModal } from "../../../components/tierlist/SaveTierListModal";
import { useAuth } from "../../../contexts/AuthProvider";
import { useTierListDomHelpers } from "../../../components/tierlist/hooks/useTierListDomHelpers";
import { useRecentTierList } from "../../../hooks/api/useRecentTierList";

const TierList: NextPage = () => {
  useRecentTierList();
  useGetInfinitePublicTierLists();
  useGetInfiniteUserTierLists();

  const { user } = useAuth();

  const router = useRouter();
  const uuid = router.query.uuid as string | undefined;

  const { fullScreen, sensors, animateChildren } = useTierListDomHelpers();

  const {
    data,
    setData,
    tierListUserID,
    queryObj: { isLoading },
    diff,
    isPublic,
    setIsPublic,
  } = useGetTierList(uuid);

  const isOwner = user?.id === tierListUserID;

  useConfirmationOnExitIfUnsavedChanges({ diff, enabled: isOwner });

  usePasteEvent(setData);

  const [activeItem, setActiveItem] = useState<ActiveItemState>(undefined);

  const rowHandler = getRowHandlers({
    setData: setData,
    data,
    enabled: data !== undefined,
  });

  const dragHandler = getDragHandlers({
    data,
    setData: setData,
    setActiveItem,
    enabled: data !== undefined,
  });

  const saveTierListHelpers = useSaveTierListActionHelpers({
    data,
    setData,
    diff,
    uuid,
    tierListUserID,
    isPublic,
    setIsPublic,
  });

  return (
    <>
      <Head>
        <title>Create Tier List</title>
      </Head>
      {saveTierListHelpers.showSaveOverlay && <SaveOverlay requestProgress={saveTierListHelpers.requestProgress} />}

      {saveTierListHelpers.modalOpened && (
        <SaveTierListModal
          onSave={saveTierListHelpers.save}
          opened={saveTierListHelpers.modalOpened}
          onClose={saveTierListHelpers.closeModal}
          modalTitle={saveTierListHelpers.modalTitle}
          tierListTitle={saveTierListHelpers.tierListTitle}
          onChangeTitle={saveTierListHelpers.changeTitle}
          description={saveTierListHelpers.description}
          requestProgress={saveTierListHelpers.requestProgress}
          showProgressBar={saveTierListHelpers.showProgressBar}
          titlePlaceholder={saveTierListHelpers.titlePlaceholder}
          onChangeDescription={saveTierListHelpers.changeDescription}
        />
      )}
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
                  isDeleting={saveTierListHelpers.deleteIsToggled}
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
            isDeleting={saveTierListHelpers.deleteIsToggled}
            onToggleDelete={saveTierListHelpers.toggleDelete}
            fullScreen={getFullScreenProp(fullScreen)}
            data={data}
            onAddImage={rowHandler.addImage}
            onDeleteImage={rowHandler.deleteImage}
            onDeleteAllImages={rowHandler.deleteAllImages}
            onMoveAllImages={rowHandler.moveAllImages}
            onClickSave={isOwner ? saveTierListHelpers.saveOwnTierList : saveTierListHelpers.openSaveMenu}
            onClickPublish={isOwner ? saveTierListHelpers.togglePublish : saveTierListHelpers.openPublishMenu}
            isOwner={isOwner}
            isPublic={isPublic}
            isTogglingPublicStatus={saveTierListHelpers.isMutatingPublicStatus}
            isLoading={isLoading}
          />
        </Flex>
        <DragOverlay>{activeItem ? <OverlayImage img={activeItem} /> : null}</DragOverlay>
      </DndContext>
    </>
  );
};

export default TierList;

type SaveOverlayProps = {
  requestProgress: number;
};

const SaveOverlay = ({ requestProgress }: SaveOverlayProps) =>
  createPortal(
    <Center sx={savingOverlayContainerSx}>
      <Text mb={20}>Saving...</Text>
      <Progress h={9} w={"100%"} maw={200} animate striped value={requestProgress} />
    </Center>,
    document.getElementById(PORTAL_TARGET_ID)!
  );
