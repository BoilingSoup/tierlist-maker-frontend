import {
  ActionIcon,
  Flex,
  FocusTrap,
  Loader,
  Text,
  TextInput,
  Tooltip,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCheck,
  IconExclamationCircle,
  IconPencil,
  IconPencilOff,
  IconX,
} from "@tabler/icons-react";
import { useAuth } from "../../../contexts/AuthProvider";
import { getInputPlaceholder } from "../helpers";
import { SettingSkeleton } from "../SettingSkeleton";
import {
  accountSettingContainerSx,
  changeEmailWarningSx,
  disabledSettingEditIconSx,
  getTextInputStyles,
  loaderSize,
  settingEditIconSx,
} from "../styles";
import { useEmailForm } from "./hooks/useEmailForm";
import { useEmailMutation } from "./hooks/useEmailMutation";

export const EmailForm = () => {
  const theme = useMantineTheme();

  const { user, isLoading } = useAuth();
  const userIsLoaded = !isLoading && user !== null;
  const editable =
    userIsLoaded && user.email_verified && user.oauth_provider === null;

  const [active, { toggle, close }] = useDisclosure(false);
  const form = useEmailForm();
  const { mutate: updateEmail, isLoading: isMutating } =
    useEmailMutation(close);

  const resetAndToggle = () => {
    form.setValues({ email: user?.email as string });
    toggle();
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => updateEmail(values))}>
        <Flex w="100%" sx={accountSettingContainerSx}>
          <FocusTrap active={active}>
            <TextInput
              label={"Email"}
              styles={getTextInputStyles({ theme, isLoading, user })}
              disabled={!active || isMutating}
              placeholder={getInputPlaceholder(user)}
              mr={isLoading ? undefined : "md"}
              {...form.getInputProps("email")}
            />
          </FocusTrap>
          {isLoading && <SettingSkeleton />}
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
                <Loader size={loaderSize} mt={4} color="cyan" />
              ) : (
                <Tooltip label="Update">
                  <ActionIcon
                    sx={settingEditIconSx}
                    type="submit"
                    disabled={
                      !form.isValid() || form.values.email === user?.email
                    }
                  >
                    <IconCheck />
                  </ActionIcon>
                </Tooltip>
              )}
            </>
          )}
        </Flex>
      </form>
      <Transition
        mounted={active}
        transition="slide-down"
        duration={100}
        timingFunction="ease"
      >
        {(style) => (
          <Flex style={style} sx={changeEmailWarningSx}>
            <IconExclamationCircle size={16} />
            <Text span ml="1ch" size="sm">
              You will need to verify your email again if you change it.
            </Text>
          </Flex>
        )}
      </Transition>
    </>
  );
};
