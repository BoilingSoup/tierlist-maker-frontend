import { ActionIcon, Flex, TextInput, useMantineTheme } from "@mantine/core";
import { IconPencil, IconPencilOff } from "@tabler/icons-react";
import { useAuth } from "../../../contexts/AuthProvider";
import { SettingSkeleton } from "../SettingSkeleton";
import {
  accountSettingContainerSx,
  disabledSettingEditIconSx,
  getTextInputStyles,
  settingEditIconSx,
} from "../styles";

export const UsernameForm = () => {
  const theme = useMantineTheme();

  const { user, isLoading } = useAuth();
  const userIsLoaded = !isLoading && user !== null;
  const editable = userIsLoaded && user.email !== null && user.email_verified;

  return (
    <form>
      <Flex w="100%" sx={accountSettingContainerSx}>
        <TextInput
          label={"Username"}
          styles={getTextInputStyles({ theme, isLoading, user })}
          disabled
          placeholder={user?.username}
          mr={isLoading ? undefined : "md"}
        />
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
    </form>
  );
};
