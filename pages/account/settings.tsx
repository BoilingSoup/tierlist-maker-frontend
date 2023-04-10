import {
  Accordion,
  ActionIcon,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  MantineTheme,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconCheck, IconPencil } from "@tabler/icons-react";
import type { NextPage } from "next";
import { useState } from "react";
import { AccountNavShell } from "../../components/account/AccountNavShell";
import { UsernameSettings } from "../../components/account/UsernameSettings";
import { useRedirectIfUnauthenticated } from "../../components/common/hooks/useRedirectIfUnauthenticated";
import { useAuth } from "../../contexts/AuthProvider";

const accountSettingsDividerColor = "dark.4";

const inputContainerWidth = "500px";
const labelWidth = "200px";

const Settings: NextPage = () => {
  const { user, isLoading } = useAuth();
  useRedirectIfUnauthenticated({ user, isLoading, redirectTo: "/" });

  const theme = useMantineTheme();

  const userIsLoaded = !isLoading && user !== null;

  const [value, setValue] = useState<string[]>([]);

  return (
    <AccountNavShell>
      <Container mt="3rem">
        <Text
          sx={() => ({
            fontSize: "2rem",
            textAlign: "center",
            color: "white",
          })}
        >
          Account Settings
        </Text>

        <Divider my="xl" color={accountSettingsDividerColor} />

        <UsernameSettings />

        <Divider color={accountSettingsDividerColor} />
        <Stack my="xl" sx={{ alignItems: "center" }}>
          <Flex
            sx={{
              width: inputContainerWidth,
              // outline: "2px solid red",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              label="E-mail"
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
                },
                input: {
                  width: "180px",
                  padding: 0,
                  border: "none",
                  background: theme.colors.dark[7],
                  ":disabled": {
                    cursor: "default",
                    background: theme.colors.dark[7],
                  },
                },
              }}
              disabled
              placeholder={user?.email !== null ? user?.email : "oauth user"}
              mr="md"
            />
            <ActionIcon>
              <IconPencil />
            </ActionIcon>
          </Flex>
          <Flex sx={{ width: inputContainerWidth, justifyContent: "flex-end" }}>
            <Button
              compact
              color="dark"
              // variant="outline"
              sx={{
                outline: "0px solid green",
                color: "white",
              }}
            >
              {user?.email_verified ? (
                <Text
                  span
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    color: theme.colors.lime[4],
                  }}
                >
                  <IconCheck size={20} />{" "}
                  <Text span ml="1ch">
                    verified
                  </Text>
                </Text>
              ) : (
                "Resend Verification Email"
              )}
            </Button>
          </Flex>
        </Stack>
        {/* <Divider my="xl" color={accountSettingsDividerColor} /> */}

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
              // display: "flex",
              // justifyContent: "center",
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
                    width: inputContainerWidth,
                    // outline: "2px solid red",
                    justifyContent: "space-between",
                  }}
                >
                  <TextInput
                    label="New Password"
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
                        outline: "2px solid red",
                        // marginRight: 0,
                      },
                      input: {
                        width: `calc(${inputContainerWidth} - ${labelWidth} - 50px)`,
                        padding: 0,
                        border: "none",
                        background: theme.colors.dark[6],
                        ":disabled": {
                          cursor: "default",
                          background: theme.colors.dark[6],
                        },
                      },
                    }}
                    disabled
                    mr="md"
                  />
                </Flex>

                <Flex
                  mt="xl"
                  mx="auto"
                  sx={{
                    width: inputContainerWidth,
                    // outline: "2px solid red",
                    // justifyContent: "space-between",
                  }}
                >
                  <TextInput
                    label="Confirm New Password"
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
                        outline: "2px solid red",
                        // marginRight: 0,
                      },
                      input: {
                        // outline: "2px solid red",
                        width: `calc(${inputContainerWidth} - ${labelWidth} - 50px)`,
                        padding: 0,
                        border: "none",
                        background: theme.colors.dark[6],
                        ":disabled": {
                          cursor: "default",
                          background: theme.colors.dark[6],
                        },
                      },
                    }}
                    disabled
                    // placeholder={""}
                    mr="md"
                  />
                </Flex>

                <Flex
                  sx={{
                    width: inputContainerWidth,
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

        {/* <Accordion */}
        {/*   my="xl" */}
        {/*   value={"test"} */}
        {/*   onChange={() => {}} */}
        {/*   styles={{ */}
        {/*     label: { */}
        {/*       color: "white", */}
        {/*     }, */}
        {/*     chevron: { */}
        {/*       color: "white", */}
        {/*     }, */}
        {/*     item: { */}
        {/*       borderBottom: `1px solid ${theme.colors.dark[4]}`, */}
        {/*     }, */}
        {/*     control: { */}
        {/*       background: theme.colors.dark[7], */}
        {/*       ":hover": { */}
        {/*         background: theme.colors.dark[7], */}
        {/*       }, */}
        {/*     }, */}
        {/*   }} */}
        {/* > */}
        {/*   <Accordion.Item value="item-1"> */}
        {/*     <Accordion.Control>Delete Account</Accordion.Control> */}
        {/*     <Accordion.Panel>panel-1</Accordion.Panel> */}
        {/*   </Accordion.Item> */}
        {/* </Accordion> */}
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
