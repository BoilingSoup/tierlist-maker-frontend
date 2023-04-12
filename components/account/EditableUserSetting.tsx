import { ActionIcon, Flex } from "@mantine/core";
import { IconPencil, IconPencilOff } from "@tabler/icons-react";
import { SettingSkeleton } from "./SettingSkeleton";
import { SettingTextInput } from "./SettingTextInput";
import {
  accountSettingContainerSx,
  disabledSettingEditIconSx,
  settingEditIconSx,
} from "./styles";

type Props = {
  label: string;
  placeholder: string | undefined;
  isLoading: boolean;
  editable?: boolean;
};

export const EditableUserSetting = ({
  label,
  placeholder,
  isLoading,
  editable = true,
}: Props) => {
  const textInputProps = {
    label,
    placeholder,
    isLoading,
    editable,
  };

  return (
    <Flex w="100%" sx={accountSettingContainerSx}>
      <SettingTextInput {...textInputProps} />
      {isLoading && <SettingSkeleton />}
      {!isLoading && editable && (
        <ActionIcon sx={settingEditIconSx}>
          <IconPencil />
        </ActionIcon>
      )}
      {!isLoading && !editable && (
        <ActionIcon sx={disabledSettingEditIconSx} disabled>
          <IconPencilOff />
        </ActionIcon>
      )}
    </Flex>
  );
};
