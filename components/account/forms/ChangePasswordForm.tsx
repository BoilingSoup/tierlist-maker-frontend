import { Button, Stack, TextInput, useMantineTheme } from "@mantine/core";
import { SettingContainer } from "../SettingContainer";
import {
  changePasswordButtonWidth,
  compactButtonHeight,
  getPasswordTextInputStyles,
  passwordInputContainerSx,
  settingButtonContainerSx,
  settingButtonSx,
} from "../styles";

export const ChangePasswordForm = () => {
  const theme = useMantineTheme();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("submitted");
      }}
    >
      <Stack my="xl" align="center">
        <SettingContainer mt="xl" display="flex" sx={passwordInputContainerSx}>
          <TextInput
            label="New Password"
            type="password"
            styles={getPasswordTextInputStyles({ theme })}
          />
        </SettingContainer>
        <SettingContainer mt="xl" display="flex" sx={passwordInputContainerSx}>
          <TextInput
            label="Confirm New Password"
            type="password"
            styles={getPasswordTextInputStyles({ theme })}
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
          >
            Change Password
          </Button>
        </SettingContainer>
      </Stack>
    </form>
  );
};
