import { SortableContext } from "@dnd-kit/sortable";
import { ActionIcon, Center, Flex, Text } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp, IconSettingsFilled } from "@tabler/icons-react";
import { useIsExportingStore } from "../../hooks/store/useIsExportingStore";
import { useResponsiveImageSize } from "../../hooks/store/useResponsiveImagesStore";
import { useDroppableRow } from "./hooks/useDroppableRow";
import { SortableImage } from "./image-area/SortableImage";
import { RowSettingsModal } from "./RowSettingsModal";
import {
  rowArrowsContainerSx,
  rowButtonsContainerSx,
  rowButtonsSx,
  rowContainerSx,
  rowImagesContainerSx,
  rowLabelContainerSx,
} from "./styles";
import { TierListRowData } from "./types";

type Props = {
  data: TierListRowData;
  deletable: boolean;
  isDeleting: boolean;
  onMoveUp: (rowID: string) => void;
  onMoveDown: (rowID: string) => void;
  onChangeLabel: (param: { rowID: string; label: string }) => void;
  onChangeColor: (param: { rowID: string; color: string }) => void;
  onAddRowAbove: (rowID: string) => void;
  onAddRowBelow: (rowID: string) => void;
  onDeleteRow: (rowID: string) => void;
  onClearRow: (rowID: string) => void;
  onDeleteImage: (droppableID: string, imgID: string) => void;
};

export const TierListRow = ({
  data,
  deletable,
  isDeleting,
  onDeleteImage: handleDeleteImage,
  onMoveUp: handleMoveUp,
  onMoveDown: handleMoveDown,
  onChangeLabel: handleChangeLabel,
  onChangeColor: handleChangeColor,
  onAddRowAbove: handleAddRowAbove,
  onAddRowBelow: handleAddRowBelow,
  onDeleteRow: handleDeleteRow,
  onClearRow: handleClearRow,
}: Props) => {
  const { id, color, items, label } = data;
  const { setNodeRef } = useDroppableRow(id);

  const [opened, { open, close }] = useDisclosure(false);

  const isExporting = useIsExportingStore((state) => state.value);

  const size = useResponsiveImageSize((state) => state.size);
  const { height: viewportHeight } = useViewportSize();

  return (
    <>
      <RowSettingsModal
        rowID={id}
        opened={opened}
        deletable={deletable}
        onClose={close}
        colorValue={color}
        onChangeColor={handleChangeColor}
        labelValue={label}
        onChangeLabel={handleChangeLabel}
        onAddRowAbove={handleAddRowAbove}
        onAddRowBelow={handleAddRowBelow}
        onDeleteRow={handleDeleteRow}
        onClearRow={handleClearRow}
      />

      <Flex sx={rowContainerSx(viewportHeight)}>
        <Center sx={rowLabelContainerSx(size, color)}>
          <Text
            sx={(theme) => ({ fontSize: `calc(${theme.fontSizes.lg} + ${theme.fontSizes.lg})`, fontWeight: "bold" })}
          >
            {label}
          </Text>
        </Center>
        <SortableContext items={items.map((item) => item.id)}>
          <Flex sx={rowImagesContainerSx} ref={setNodeRef}>
            {items.map((item) => (
              <SortableImage
                key={item.id}
                img={item}
                containerID={data.id}
                isDeleting={isDeleting}
                onDelete={handleDeleteImage}
              />
            ))}
          </Flex>
        </SortableContext>
        {!isExporting && (
          <Flex sx={rowButtonsContainerSx}>
            <Center w="50%">
              <ActionIcon sx={rowButtonsSx} onClick={open}>
                <IconSettingsFilled size={40} />
              </ActionIcon>
            </Center>
            <Center w="50%" sx={rowArrowsContainerSx}>
              <ActionIcon sx={rowButtonsSx} onClick={() => handleMoveUp(id)}>
                <IconChevronUp />
              </ActionIcon>
              <ActionIcon sx={rowButtonsSx} onClick={() => handleMoveDown(id)}>
                <IconChevronDown />
              </ActionIcon>
            </Center>
          </Flex>
        )}
      </Flex>
    </>
  );
};
