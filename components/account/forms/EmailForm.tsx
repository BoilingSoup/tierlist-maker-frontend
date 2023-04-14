import { ActionIcon, Flex, TextInput, useMantineTheme } from "@mantine/core";
import { IconPencil, IconPencilOff } from "@tabler/icons-react";
import { useAuth } from "../../../contexts/AuthProvider";
import { getInputPlaceholder } from "../helpers";
import { SettingSkeleton } from "../SettingSkeleton";
import {
  accountSettingContainerSx,
  disabledSettingEditIconSx,
  getTextInputStyles,
  settingEditIconSx,
} from "../styles";

export const EmailForm = () => {
  const theme = useMantineTheme();

  const { user, isLoading } = useAuth();
  const userIsLoaded = !isLoading && user !== null;
  const editable = userIsLoaded && user.email !== null && user.email_verified;

  return (
    <form>
      <Flex w="100%" sx={accountSettingContainerSx}>
        <TextInput
          label={"Email"}
          styles={getTextInputStyles({ theme, isLoading, editable })}
          disabled
          placeholder={getInputPlaceholder(user)}
          mr={isLoading ? undefined : "md"}
        />
        {isLoading && <SettingSkeleton />}
        {userIsLoaded && editable && (
          <ActionIcon sx={settingEditIconSx}>
            <IconPencil />
          </ActionIcon>
        )}
        {userIsLoaded && !editable && (
          <ActionIcon sx={disabledSettingEditIconSx} disabled>
            <IconPencilOff />
          </ActionIcon>
        )}
      </Flex>
    </form>
  );
};
