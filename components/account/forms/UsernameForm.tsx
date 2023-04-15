import {
  ActionIcon,
  Flex,
  FocusTrap,
  Styles,
  TextInput,
  TextInputStylesNames,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconX,
  IconCheck,
  IconPencil,
  IconPencilOff,
} from "@tabler/icons-react";
import { useReducer, useRef } from "react";
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

  const [active, { toggle }] = useDisclosure(editable);

  return (
    <form>
      <Flex w="100%" sx={accountSettingContainerSx}>
        <FocusTrap active={active}>
          <TextInput
            label={"Username"}
            styles={textInputStyles}
            disabled={!active}
            placeholder={user?.username}
            mr={isLoading ? undefined : "md"}
          />
        </FocusTrap>
        {isLoading && <SettingSkeleton />}
        {userIsLoaded && !active && (
          <ActionIcon sx={settingEditIconSx} onClick={toggle}>
            <IconPencil />
          </ActionIcon>
        )}
        {userIsLoaded && active && (
          <>
            <ActionIcon sx={settingEditIconSx} onClick={toggle}>
              <IconX />
            </ActionIcon>
            <ActionIcon sx={settingEditIconSx} onClick={toggle}>
              <IconCheck />
            </ActionIcon>
          </>
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
