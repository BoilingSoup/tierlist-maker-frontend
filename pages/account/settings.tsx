import {
  Accordion,
  Container,
  Divider,
  Flex,
  Skeleton,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { AccountNavShell } from "../../components/account/AccountNavShell";
import { ChangePasswordForm } from "../../components/account/forms/ChangePasswordForm";
import { EmailForm } from "../../components/account/forms/EmailForm";
import { UsernameForm } from "../../components/account/forms/UsernameForm";
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
  settingSkeletonSx,
  accordionCollapsedHeight,
} from "../../components/account/styles";
import { useRedirectIfUnauthenticated } from "../../components/common/hooks/useRedirectIfUnauthenticated";
import { useAuth } from "../../contexts/AuthProvider";

const Settings: NextPage = () => {
  const { user, isLoading } = useAuth();
  useRedirectIfUnauthenticated({ user, isLoading, redirectTo: "/" });

  const theme = useMantineTheme();

  const userIsLoaded = !isLoading && user !== null;
  const oauthProvider = user?.oauth_provider;

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
          <UsernameForm />
        </SettingContainer>
        <Divider my="xl" color={settingDividerColor} />
        <Stack align="center" my="xl">
          <SettingContainer>
            <EmailForm />
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

        {isLoading ? (
          <Skeleton
            my="xl"
            h={accordionCollapsedHeight}
            w="100%"
            sx={settingSkeletonSx}
          />
        ) : (
          <Accordion
            my="xl"
            value={activeAccordionPanel}
            multiple
            onChange={setActiveAccordionPanel}
            styles={getAccountSettingsAccordionStyles(theme)}
          >
            {!oauthProvider && user?.email_verified && (
              <Accordion.Item value="item-1">
                <Accordion.Control>Change Password</Accordion.Control>
                <Accordion.Panel>
                  <ChangePasswordForm />
                </Accordion.Panel>
              </Accordion.Item>
            )}
            <Accordion.Item value="item-2">
              <Accordion.Control>Delete Account</Accordion.Control>
              <Accordion.Panel>stuff here</Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
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
