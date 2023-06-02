import { ColorInput, DEFAULT_THEME, Flex, Modal, Space, TextInput } from "@mantine/core";

type Props = {
  rowID: string;
  opened: boolean;
  colorValue: string;
  onChangeColor: (param: { rowID: string; color: string }) => void;
  labelValue: string;
  onChangeLabel: (param: { rowID: string; label: string }) => void;
  onClose: () => void;
};

export const RowSettingsModal = ({
  rowID,
  opened,
  colorValue: color,
  onChangeColor: handleChangeColor,
  labelValue: label,
  onChangeLabel: handleChangeLabel,
  onClose: close,
}: Props) => {
  return (
    <Modal opened={opened} onClose={close} title="Row Settings" centered>
      <Flex>
        <TextInput
          label="Label"
          value={label}
          onChange={(e) => handleChangeLabel({ rowID, label: e.currentTarget.value })}
        />
        <Space w="md" />
        <ColorInput
          withPicker={false}
          withEyeDropper={false}
          label="Color"
          value={color}
          autoFocus={false}
          onChange={(input) => handleChangeColor({ rowID, color: input })}
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
  );
};
