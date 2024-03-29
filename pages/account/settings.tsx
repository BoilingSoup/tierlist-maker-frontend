import {
  Accordion,
  Button,
  Container,
  Divider,
  Flex,
  Loader,
  Skeleton,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AccountNavShell } from "../../components/account/AccountNavShell";
import { ChangePasswordForm } from "../../components/account/forms/ChangePasswordForm";
import { EmailForm } from "../../components/account/forms/EmailForm";
import { useResendVerificationEmail } from "../../components/account/forms/hooks/useResendVerificationEmail";
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
import { SITE_NAME } from "../../config/config";
import { useAuth } from "../../contexts/AuthProvider";
import { useDeleteAccountMutation } from "../../hooks/api/useDeleteAccountMutation";
import { useGetInfinitePublicTierLists } from "../../hooks/api/useGetInfinitePublicTierLists";
import { useGetInfiniteUserTierLists } from "../../hooks/api/useGetInfiniteUserTierLists";
import { useRecentTierList } from "../../hooks/api/useRecentTierList";

const Settings: NextPage = () => {
  const { user, isLoading } = useAuth();
  useRedirectIfUnauthenticated({ user, isLoading, redirectTo: "/" });

  useGetInfinitePublicTierLists();
  useGetInfiniteUserTierLists();
  useRecentTierList();

  const theme = useMantineTheme();

  const userIsLoaded = !isLoading && user !== null;
  const oauthProvider = user?.oauth_provider;

  const [activeAccordionPanel, setActiveAccordionPanel] = useState<string[]>([]);

  const { mutate: resendVerification, isLoading: isMutating } = useResendVerificationEmail();

  const { mutate: deleteAccountMutation } = useDeleteAccountMutation();

  return (
    <>
      <Head>
        <title>Settings - tierlist.lol</title>
      </Head>

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
                disabled={(userIsLoaded && user.email_verified) || isMutating}
                onClick={resendVerification}
              >
                {userIsLoaded && user.email_verified && (
                  <Flex sx={emailVerifiedButtonContentsSx}>
                    <IconCheck size={verifiedCheckSize} />
                    <Text span ml="1ch">
                      verified
                    </Text>
                  </Flex>
                )}
                {userIsLoaded && !user.email_verified && !isMutating && <Text span>Resend Verification Email</Text>}
                {userIsLoaded && !user.email_verified && isMutating && <Loader size="xs" color="cyan" />}
              </SettingSubmitButton>
            </SettingContainer>
          </Stack>

          {isLoading ? (
            <Skeleton my="xl" h={accordionCollapsedHeight} w="100%" sx={settingSkeletonSx} />
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
                <Accordion.Panel>
                  <Stack mt="xl" sx={{ alignItems: "center" }}>
                    <Text color="yellow.5">This action can not be undone. &nbsp;Are you sure?</Text>
                    <Button color="red.9" onClick={() => deleteAccountMutation()}>
                      Delete Account
                    </Button>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          )}
        </Container>
      </AccountNavShell>
    </>
  );
};

export default Settings;
