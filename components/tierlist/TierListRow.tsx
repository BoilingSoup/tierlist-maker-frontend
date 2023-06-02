import { SortableContext } from "@dnd-kit/sortable";
import {
  ActionIcon,
  Center,
  ColorInput,
  CSSObject,
  DEFAULT_THEME,
  Flex,
  MantineTheme,
  Modal,
  Space,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp, IconSettingsFilled } from "@tabler/icons-react";
import { useDroppableRow } from "./hooks/useDroppableRow";
import { SortableImage } from "./image-area/SortableImage";
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
}: Props) => {
  const { id, color, items, label } = data;
  const { setNodeRef } = useDroppableRow(id);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Row Settings" centered>
        <Flex>
          <TextInput
            label="Label"
            value={label}
            onChange={(e) => handleChangeLabel({ rowID: id, label: e.currentTarget.value })}
          />
          <Space w="md" />
          <ColorInput
            withPicker={false}
            withEyeDropper={false}
            label="Color"
            value={color}
            autoFocus={false}
            onChange={(input) => handleChangeColor({ rowID: id, color: input })}
            disallowInput
            swatches={[
              ...DEFAULT_THEME.colors.red,
              ...DEFAULT_THEME.colors.green,
              ...DEFAULT_THEME.colors.blue,
              ...DEFAULT_THEME.colors.cyan,
            ]}
          />
        </Flex>
      </Modal>
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
