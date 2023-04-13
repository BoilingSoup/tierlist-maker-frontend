import {
  Accordion,
  Container,
  Divider,
  Flex,
  Skeleton,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import type { NextPage } from "next";
import { useState } from "react";
import { AccountNavShell } from "../../components/account/AccountNavShell";
import { EditableUserSetting } from "../../components/account/EditableUserSetting";
import { getEmailPlaceholder } from "../../components/account/helpers";
import { SettingContainer } from "../../components/account/SettingContainer";
import { SettingSubmitButton } from "../../components/account/SettingSubmitButton";
import {
  settingDividerColor,
  accountSettingsTitleSx,
  settingButtonContainerSx,
  compactButtonHeight,
  emailVerifiedButtonContentsSx,
  verifiedCheckSize,
  getEmailVerificationButtonWidth,
  getEmailVerificationButtonSx,
  getAccountSettingsAccordionStyles,
  getPasswordTextInputStyles,
  changePasswordButtonWidth,
  settingSkeletonSx,
  passwordInputContainerSx,
  inputHeight,
} from "../../components/account/styles";
import { useRedirectIfUnauthenticated } from "../../components/common/hooks/useRedirectIfUnauthenticated";
import { useAuth } from "../../contexts/AuthProvider";

const Settings: NextPage = () => {
  const { user, isLoading } = useAuth();
  useRedirectIfUnauthenticated({ user, isLoading, redirectTo: "/" });

  const theme = useMantineTheme();

  const userIsLoaded = !isLoading && user !== null;
  const emailIsEditable = userIsLoaded && user.email !== null;

  const [activeAccordionPanel, setActiveAccordionPanel] = useState<string[]>(
    []
  );

  return (
    <AccountNavShell>
      <Container mt="3rem">
        <Text component="h1" sx={accountSettingsTitleSx}>
          Account Settings
        </Text>
        <Divider my="xl" color={settingDividerColor} />
        <SettingContainer my="xl">
          <EditableUserSetting
            skeleton={isLoading}
            label="Username"
            placeholder={user?.username}
          />
        </SettingContainer>
        <Divider my="xl" color={settingDividerColor} />
        <Stack align="center" my="xl">
          <SettingContainer>
            <EditableUserSetting
              skeleton={isLoading}
              label="E-mail"
              placeholder={getEmailPlaceholder(user)}
              editable={emailIsEditable}
            />
          </SettingContainer>
          <SettingContainer sx={settingButtonContainerSx}>
            <SettingSubmitButton
              skeleton={isLoading}
              compact
              h={compactButtonHeight}
              w={getEmailVerificationButtonWidth({ user, isLoading })}
              sx={getEmailVerificationButtonSx({ user, isLoading })}
              disabled={userIsLoaded && user.email_verified}
            >
              {userIsLoaded && user.email_verified ? (
                <Flex sx={emailVerifiedButtonContentsSx}>
                  <IconCheck size={verifiedCheckSize} />
                  <Text span ml="1ch">
                    verified
                  </Text>
                </Flex>
              ) : (
                "Resend Verification Email"
              )}
            </SettingSubmitButton>
          </SettingContainer>
        </Stack>

        <Accordion
          my="xl"
          value={activeAccordionPanel}
          multiple
          onChange={setActiveAccordionPanel}
          styles={getAccountSettingsAccordionStyles(theme)}
        >
          <Accordion.Item value="item-1">
            <Accordion.Control>Change Password</Accordion.Control>
            <Accordion.Panel>
              <Stack my="xl" align="center">
                <SettingContainer
                  mt="xl"
                  display="flex"
                  sx={passwordInputContainerSx}
                >
                  <TextInput
                    label="New Password"
                    type="password"
                    styles={getPasswordTextInputStyles({ theme, isLoading })}
                  />
                  {isLoading && (
                    <Skeleton height={inputHeight} sx={settingSkeletonSx} />
                  )}
                </SettingContainer>
                <SettingContainer
                  mt="xl"
                  display="flex"
                  sx={passwordInputContainerSx}
                >
                  <TextInput
                    label="Confirm New Password"
                    type="password"
                    styles={getPasswordTextInputStyles({ theme, isLoading })}
                  />
                  {isLoading && (
                    <Skeleton height={inputHeight} sx={settingSkeletonSx} />
                  )}
                </SettingContainer>
                <SettingContainer sx={settingButtonContainerSx}>
                  <SettingSubmitButton
                    compact
                    color="dark"
                    skeleton={isLoading}
                    mt="xl"
                    h={compactButtonHeight}
                    w={changePasswordButtonWidth}
                  >
                    Change Password
                  </SettingSubmitButton>
                </SettingContainer>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Control>Delete Account</Accordion.Control>
            <Accordion.Panel>stuff here</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>

      {/* {userIsLoaded && ( */}
      {/*   <Text color="white" align="center" weight={"bold"} mt="xl"> */}
      {/*     {JSON.stringify(user)} */}
      {/*   </Text> */}
      {/* )} */}
    </AccountNavShell>
  );
};

export default Settings;
