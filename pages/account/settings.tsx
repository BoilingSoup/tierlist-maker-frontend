import {
  Accordion,
  Button,
  Container,
  Divider,
  Flex,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";
import { AccountNavShell } from "../../components/account/AccountNavShell";
import { EditableUserSetting } from "../../components/account/EditableUserSetting";
import { getEmailPlaceholder } from "../../components/account/helpers";
import { SettingContainer } from "../../components/account/SettingContainer";
import { SettingSubmitButton } from "../../components/account/SettingSubmitButton";
import {
  settingContainerWidth,
  labelWidth,
  settingsDividerColor,
  settingsTitleSx,
} from "../../components/account/styles";
import { useRedirectIfUnauthenticated } from "../../components/common/hooks/useRedirectIfUnauthenticated";
import { useAuth } from "../../contexts/AuthProvider";

const Settings: NextPage = () => {
  const { user, isLoading } = useAuth();
  useRedirectIfUnauthenticated({ user, isLoading, redirectTo: "/" });

  const theme = useMantineTheme();

  const userIsLoaded = !isLoading && user !== null;
  const emailIsEditable = userIsLoaded && user.email !== null;

  const [value, setValue] = useState<string[]>([]);

  return (
    <AccountNavShell>
      <Container mt="3rem">
        <Text component="h1" sx={settingsTitleSx}>
          Account Settings
        </Text>
        <Divider my="xl" color={settingsDividerColor} />
        <SettingContainer my="xl">
          <EditableUserSetting
            label="Username"
            placeholder={user?.username}
            isLoading={isLoading}
          />
        </SettingContainer>
        <Divider my="xl" color={settingsDividerColor} />
        <Stack align="center" my="xl">
          <SettingContainer>
            <EditableUserSetting
              label="E-mail"
              placeholder={getEmailPlaceholder(user)}
              isLoading={isLoading}
              editable={emailIsEditable}
            />
          </SettingContainer>
          <SettingContainer>
            <SettingSubmitButton isLoading={isLoading} />
          </SettingContainer>
        </Stack>

        <Accordion
          my="xl"
          value={value}
          multiple
          onChange={setValue}
          styles={{
            label: {
              color: "white",
            },
            chevron: {
              color: "white",
            },
            item: {
              margin: "3rem 0",
              border: "none",
              // borderBottom: `1px solid ${theme.colors.dark[4]}`,
            },
            control: {
              background: theme.colors.dark[7],
              borderBottom: `1px solid ${theme.colors.dark[4]}`,
              ":hover": {
                background: theme.colors.dark[7],
              },
            },
            panel: {
              color: "white",
            },
          }}
        >
          <Accordion.Item value="item-1">
            <Accordion.Control>Reset Password</Accordion.Control>
            <Accordion.Panel>
              <Stack my="xl" sx={{ alignItems: "center" }}>
                <Flex
                  mt="xl"
                  mx="auto"
                  sx={{
                    width: settingContainerWidth,
                    // outline: "2px solid red",
                    justifyContent: "space-between",
                  }}
                >
                  <TextInput
                    label="New Password"
                    type="password"
                    styles={{
                      label: {
                        color: "white",
                        display: "inline-block",
                        width: labelWidth,
                        fontSize: "1rem",
                        marginRight: "3rem",
                      },
                      wrapper: {
                        display: "inline-block",
                        margin: 0,
                        // width: inputContainerWidth,
                      },

                      root: {
                        width: "100%",
                      },
                      input: {
                        color: "white",
                        width: `calc(${settingContainerWidth} - ${labelWidth} - 50px)`,
                        // padding: 0,
                        border: "none",
                        background: theme.colors.dark[6],
                        ":disabled": {
                          cursor: "default",
                          background: theme.colors.dark[6],
                        },
                      },
                    }}
                  />
                </Flex>

                <Flex
                  mt="xl"
                  mx="auto"
                  sx={{
                    width: settingContainerWidth,
                    // outline: "2px solid red",
                    // justifyContent: "space-between",
                  }}
                >
                  <TextInput
                    label="Confirm New Password"
                    type="password"
                    styles={{
                      label: {
                        color: "white",
                        display: "inline-block",
                        width: labelWidth,
                        fontSize: "1rem",
                        marginRight: "3rem",
                      },
                      wrapper: {
                        display: "inline-block",
                        // width: `calc(${inputContainerWidth} - ${labelWidth})`,
                        // outline: "2px solid red",
                      },
                      root: {
                        width: "100%",
                      },
                      input: {
                        color: "white",
                        width: `calc(${settingContainerWidth} - ${labelWidth} - 50px)`,
                        // padding: 0,
                        border: "none",
                        background: theme.colors.dark[6],
                        ":disabled": {
                          cursor: "default",
                          background: theme.colors.dark[6],
                        },
                      },
                    }}
                  />
                </Flex>

                <Flex
                  sx={{
                    width: settingContainerWidth,
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    compact
                    color="dark"
                    mt="xl"
                    // variant="outline"
                    sx={{
                      outline: "0px solid green",
                      color: "white",
                    }}
                  >
                    Change Password
                  </Button>
                </Flex>
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
