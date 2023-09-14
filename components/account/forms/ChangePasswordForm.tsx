import { Button, Loader, Stack, TextInput, useMantineTheme } from "@mantine/core";
import { SettingContainer } from "../SettingContainer";
import {
  changePasswordButtonWidth,
  compactButtonHeight,
  getPasswordTextInputStyles,
  passwordInputContainerSx,
  settingButtonContainerSx,
  settingButtonSx,
} from "../styles";
import { useChangePasswordForm } from "./hooks/useChangePasswordForm";
import { useChangePasswordMutation } from "./hooks/useChangePasswordMutation";

export const ChangePasswordForm = () => {
  const theme = useMantineTheme();

  const form = useChangePasswordForm();
  const { mutate: changePassword, isLoading: isMutating } = useChangePasswordMutation(form);

  return (
    <form onSubmit={form.onSubmit((values) => changePassword(values))}>
      <Stack my="xl" align="center">
        <SettingContainer mt="xl" display="flex" sx={passwordInputContainerSx}>
          <TextInput
            label="Current Password"
            type="password"
            styles={getPasswordTextInputStyles({ theme })}
            {...form.getInputProps("current_password")}
            disabled={isMutating}
          />
        </SettingContainer>
        <SettingContainer mt="xl" display="flex" sx={passwordInputContainerSx}>
          <TextInput
            label="New Password"
            type="password"
            styles={getPasswordTextInputStyles({ theme })}
            {...form.getInputProps("password")}
            disabled={isMutating}
          />
        </SettingContainer>
        <SettingContainer mt="xl" display="flex" sx={passwordInputContainerSx}>
          <TextInput
            label="Confirm New Password"
            type="password"
            styles={getPasswordTextInputStyles({ theme })}
            {...form.getInputProps("password_confirmation")}
            disabled={isMutating}
          />
        </SettingContainer>
        <SettingContainer sx={settingButtonContainerSx}>
          <Button
            compact
            color="dark"
            h={compactButtonHeight}
            w={changePasswordButtonWidth}
            sx={settingButtonSx}
            type="submit"
            disabled={!form.isValid() || isMutating}
          >
            {isMutating ? <Loader size={16} color="cyan" /> : "Change Password"}
          </Button>
        </SettingContainer>
      </Stack>
    </form>
  );
};
