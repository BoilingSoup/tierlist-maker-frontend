import { Button, ColorInput, DEFAULT_THEME, Divider, Flex, Modal, TextInput, useMantineTheme } from "@mantine/core";
import { CalcSize } from "./types";

type Props = {
  rowID: string;
  opened: boolean;
  colorValue: string;
  onChangeColor: (param: { rowID: string; color: string }) => void;
  labelValue: string;
  onChangeLabel: (param: { rowID: string; label: string }) => void;
  onClose: () => void;
};

const swatches = [
  DEFAULT_THEME.colors.red[5],
  DEFAULT_THEME.colors.orange[5],
  DEFAULT_THEME.colors.yellow[5],
  DEFAULT_THEME.colors.lime[5],
  DEFAULT_THEME.colors.green[5],
  DEFAULT_THEME.colors.cyan[5],
  DEFAULT_THEME.colors.blue[5],
  DEFAULT_THEME.colors.indigo[5],
  DEFAULT_THEME.colors.grape[5],
  DEFAULT_THEME.colors.violet[5],
  DEFAULT_THEME.colors.gray[5],
];

export const RowSettingsModal = ({
  rowID,
  opened,
  colorValue: color,
  onChangeColor: handleChangeColor,
  labelValue: label,
  onChangeLabel: handleChangeLabel,
  onClose: close,
}: Props) => {
  const theme = useMantineTheme();
  const width: CalcSize = `calc(50% - ${theme.spacing.md} / 2)`; // 2 items per row, with theme.spacing.md space between them

  return (
    <Modal opened={opened} onClose={close} title="Row Settings" centered>
      <Flex w="100%" justify="space-between">
        <TextInput
          label="Label Text"
          value={label}
          styles={{ root: { width } }}
          onChange={(e) => handleChangeLabel({ rowID, label: e.currentTarget.value })}
        />
        <ColorInput
          withPicker={false}
          withEyeDropper={false}
          label="Label Background"
          value={color}
          autoFocus={false}
          onChange={(input) => handleChangeColor({ rowID, color: input })}
          disallowInput
          swatchesPerRow={swatches.length}
          swatches={swatches}
          styles={{ root: { width } }}
        />
      </Flex>
      <Divider my="md" />
      <Flex w="100%" justify="space-between">
        <Button w={width}>Delete Row</Button>
        <Button w={width}>Clear Row Images</Button>
      </Flex>
      <Divider my="md" />
      <Flex w="100%" justify="space-between">
        <Button w={width}>Add a Row Above</Button>
        <Button w={width}>Add a Row Below</Button>
      </Flex>
    </Modal>
  );
};
