import {
  ActionIcon,
  Flex,
  Styles,
  TextInput,
  TextInputStylesNames,
  useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconPencilOff } from "@tabler/icons-react";
import { useReducer } from "react";
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
  const editable = userIsLoaded && user.email_verified;

  const textInputStyles: Styles<TextInputStylesNames, Record<string, any>> = {
    ...getTextInputStyles({ theme, isLoading, user }),
  };
  if (editable) {
    textInputStyles.input!.fontStyle = "default";
  }

  const [disabled, toggle] = useReducer((prev) => !prev, editable);

  return (
    <form>
      <Flex w="100%" sx={accountSettingContainerSx}>
        <TextInput
          label={"Username"}
          styles={textInputStyles}
          disabled={disabled}
          placeholder={user?.username}
          mr={isLoading ? undefined : "md"}
        />
        {isLoading && <SettingSkeleton />}
        {userIsLoaded && editable && (
          <ActionIcon sx={settingEditIconSx} onClick={toggle}>
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
