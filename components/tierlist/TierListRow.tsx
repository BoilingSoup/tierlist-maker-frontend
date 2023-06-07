import { SortableContext } from "@dnd-kit/sortable";
import { ActionIcon, Center, CSSObject, Flex, MantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp, IconSettingsFilled } from "@tabler/icons-react";
import { useDroppableRow } from "./hooks/useDroppableRow";
import { SortableImage } from "./image-area/SortableImage";
import { RowSettingsModal } from "./RowSettingsModal";
import { rowArrowsContainerSx, rowButtonsContainerSx, rowButtonsSx } from "./styles";
import { PxSize, TierListRowData } from "./types";

type Props = {
  data: TierListRowData;
  height: PxSize;
  maxHeight: PxSize;
  onMoveUp: (rowID: string) => void;
  onMoveDown: (rowID: string) => void;
  onChangeLabel: (param: { rowID: string; label: string }) => void;
  onChangeColor: (param: { rowID: string; color: string }) => void;
  onAddRowAbove: (rowID: string) => void;
  onAddRowBelow: (rowID: string) => void;
  onDeleteRow: (rowID: string) => void;
};

const junk = (theme: MantineTheme): CSSObject => ({
  width: "100%",
  backgroundImage: `radial-gradient(ellipse, ${theme.colors.dark[9]}, ${theme.fn.lighten(theme.colors.dark[8], 0.03)})`,
});

export const TierListRow = ({
  data,
  height,
  maxHeight,
  onMoveUp: handleMoveUp,
  onMoveDown: handleMoveDown,
  onChangeLabel: handleChangeLabel,
  onChangeColor: handleChangeColor,
  onAddRowAbove: handleAddRowAbove,
  onAddRowBelow: handleAddRowBelow,
  onDeleteRow: handleDeleteRow,
}: Props) => {
  const { id, color, items, label } = data;
  const { setNodeRef } = useDroppableRow(id);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <RowSettingsModal
        rowID={id}
        opened={opened}
        onClose={close}
        colorValue={color}
        onChangeColor={handleChangeColor}
        labelValue={label}
        onChangeLabel={handleChangeLabel}
        onAddRowAbove={handleAddRowAbove}
        onAddRowBelow={handleAddRowBelow}
        onDeleteRow={handleDeleteRow}
      />

      <Flex
        sx={{
          border: "2px solid black",
          height: `clamp(100px, ${height}, ${maxHeight})`,
        }}
      >
        <Center
          sx={{
            width: `clamp(100px, ${height}, ${maxHeight})`,
            backgroundColor: color,
            color: "black",
            fontSize: "clamp(2rem, 6vw, 3rem)",
            borderRight: "2px solid black",
          }}
        >
          {label}
        </Center>
        <SortableContext items={items.map((item) => item.id)}>
          <Flex sx={junk} ref={setNodeRef}>
            {items.map((item) => (
              <SortableImage key={item.id} img={item} containerID={data.id} />
            ))}
          </Flex>
        </SortableContext>
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
      </Flex>
    </>
  );
};
