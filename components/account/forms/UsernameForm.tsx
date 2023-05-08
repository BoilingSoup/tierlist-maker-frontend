import {
  ActionIcon,
  Flex,
  FocusTrap,
  Loader,
  Styles,
  TextInput,
  TextInputStylesNames,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconX,
  IconCheck,
  IconPencil,
  IconPencilOff,
} from "@tabler/icons-react";
import { useAuth } from "../../../contexts/AuthProvider";
import { SettingSkeleton } from "../SettingSkeleton";
import {
  accountSettingContainerSx,
  disabledSettingEditIconSx,
  getTextInputStyles,
  loaderSize,
  settingEditIconSx,
} from "../styles";
import { useUsernameForm } from "./hooks/useUsernameForm";
import { useUsernameMutation } from "./hooks/useUsernameMutation";

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

  const [active, { toggle, close }] = useDisclosure(false);
  const form = useUsernameForm();
  const { mutate: updateUsername, isLoading: isMutating } =
    useUsernameMutation(close);

  const resetAndToggle = () => {
    form.setValues({ username: user?.username });
    toggle();
  };

  const placeholder = active ? "" : user?.username;

  return (
    <form onSubmit={form.onSubmit((values) => updateUsername(values))}>
      <Flex w="100%" sx={accountSettingContainerSx}>
        <FocusTrap active={active}>
          <TextInput
            label={"Username"}
            styles={textInputStyles}
            disabled={!active || isMutating}
            placeholder={placeholder}
            mr={isLoading ? undefined : "md"}
            {...form.getInputProps("username")}
          />
        </FocusTrap>
        {isLoading && <SettingSkeleton />}
        <Flex>
          {userIsLoaded && editable && !active && (
            <Tooltip label="Edit">
              <ActionIcon sx={settingEditIconSx} onClick={toggle}>
                <IconPencil />
              </ActionIcon>
            </Tooltip>
          )}
          {userIsLoaded && !editable && (
            <ActionIcon sx={disabledSettingEditIconSx} disabled>
              <IconPencilOff />
            </ActionIcon>
          )}
          {userIsLoaded && active && (
            <>
              <Tooltip label="Cancel">
                <ActionIcon
                  sx={settingEditIconSx}
                  onClick={resetAndToggle}
                  disabled={isMutating}
                >
                  <IconX />
                </ActionIcon>
              </Tooltip>
              {isMutating ? (
                <Loader size={loaderSize} mt={3} color="cyan" />
              ) : (
                <Tooltip label="Update">
                  <ActionIcon
                    sx={settingEditIconSx}
                    type="submit"
                    disabled={
                      !form.isValid() || form.values.username === user?.username
                    }
                  >
                    <IconCheck />
                  </ActionIcon>
                </Tooltip>
              )}
            </>
          )}
        </Flex>
      </Flex>
    </form>
  );
};
