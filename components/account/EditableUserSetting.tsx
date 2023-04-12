import { ActionIcon, Flex } from "@mantine/core";
import { IconPencil, IconPencilOff } from "@tabler/icons-react";
import { SettingSkeleton } from "./SettingSkeleton";
import { SettingTextInput } from "./SettingTextInput";
import { accountSettingContainerSx, settingEditIconSx } from "./styles";

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
}: Props) => {
  const textInputProps = {
    label,
    placeholder,
  };

  return (
    <Flex w="100%" sx={accountSettingContainerSx}>
      {/*isLoading not included in textInputProps to make common dependencies obvious at a glance*/}
      <SettingTextInput {...{ ...textInputProps, isLoading }} />
      {isLoading && <SettingSkeleton />}
      {!isLoading && (
        <ActionIcon sx={settingEditIconSx}>
          {/* <IconPencil /> */}
          <IconPencil />
        </ActionIcon>
      )}
    </Flex>
  );
};
