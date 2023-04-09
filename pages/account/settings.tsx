import {
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
import { IconPencil } from "@tabler/icons-react";
import type { NextPage } from "next";
import { AccountNavShell } from "../../components/account/AccountNavShell";
import { useRedirectIfUnauthenticated } from "../../components/common/hooks/useRedirectIfUnauthenticated";
import { useAuth } from "../../contexts/AuthProvider";

const Settings: NextPage = () => {
  const { user, isLoading } = useAuth();
  useRedirectIfUnauthenticated({ user, isLoading, redirectTo: "/" });

  const theme = useMantineTheme();

  const userIsLoaded = !isLoading && user !== null;

  return (
    <AccountNavShell>
      <Container sx={{ marginTop: "3rem" }}>
        <Text color="white" sx={{ fontSize: "2rem", textAlign: "center" }}>
          Account Settings
        </Text>

        {/* <Stack */}
        {/*   sx={({ colors }: MantineTheme) => ({ */}
        {/*     width: "500px", */}
        {/*     // border: `2px solid ${colors.dark[4]}`, */}
        {/*     // borderRadius: "12px", */}
        {/*     // padding: "2rem", */}
        {/*     margin: "auto", */}
        {/*   })} */}
        {/* > */}
        {/*   {/* <Text color="white">Username</Text> */}
        {/*   <TextInput */}
        {/*     label="Username" */}
        {/*     styles={{ */}
        {/*       label: { */}
        {/*         color: "white", */}
        {/*         width: "150px", */}
        {/*         textAlign: "left", */}
        {/*         fontSize: "1.2rem", */}
        {/*       }, */}
        {/*     }} */}
        {/*     disabled */}
        {/*     placeholder={user?.username} */}
        {/*   /> */}
        {/*   <Box ml="auto"> */}
        {/*     <Button sx={{ width: "90px", marginRight: "1rem" }}>Cancel</Button> */}
        {/*     <Button sx={{ width: "90px" }}>Edit</Button> */}
        {/*   </Box> */}
        {/* </Stack> */}

        <Center my="xl">
          <TextInput
            label="username"
            styles={{
              label: {
                color: "white",
                display: "inline-block",
                width: "100px",
                // textAlign: "right",
                fontSize: "1rem",
                marginRight: "4ch",
              },
              wrapper: {
                display: "inline-block",
              },
              input: {
                // outline: "none",
                border: "none",
                ":disabled": {
                  background: theme.colors.dark[7],
                  cursor: "default",
                },
                // background: "purple",
              },
            }}
            sx={{
              "&[data-disabled]": {},
            }}
            disabled
            placeholder={user?.username}
            mr="md"
          />
          <ActionIcon>
            <IconPencil />
          </ActionIcon>
        </Center>
        <Divider color="dark.4" />
        <Center mt="xl">
          <TextInput
            label="e-mail"
            styles={{
              label: {
                color: "white",
                display: "inline-block",
                width: "100px",
                // textAlign: "right",
                fontSize: "1rem",
                marginRight: "4ch",
              },
              wrapper: {
                display: "inline-block",
              },
              input: {
                // outline: "none",
                border: "none",
                ":disabled": {
                  background: theme.colors.dark[7],
                  cursor: "default",
                },
                // background: "purple",
              },
            }}
            disabled
            placeholder={user?.username}
            mr="md"
          />
          <ActionIcon>
            <IconPencil />
          </ActionIcon>
        </Center>
      </Container>
      {/* {userIsLoaded && ( */}
      {/*   <Text color="white" align="center" weight={"bold"} mt="xl"> */}
      {/*     {user.username} */}
      {/*   </Text> */}
      {/* )} */}
    </AccountNavShell>
  );
};

export default Settings;
