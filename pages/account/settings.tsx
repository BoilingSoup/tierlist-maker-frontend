import { ActionIcon, Center, Container, Text, TextInput } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import type { NextPage } from "next";
import { AccountNavShell } from "../../components/account/AccountNavShell";
import { useRedirectIfUnauthenticated } from "../../components/common/hooks/useRedirectIfUnauthenticated";
import { useAuth } from "../../contexts/AuthProvider";

const Settings: NextPage = () => {
  const { user, isLoading } = useAuth();
  useRedirectIfUnauthenticated({ user, isLoading, redirectTo: "/" });

  const userIsLoaded = !isLoading && user !== null;

  return (
    <AccountNavShell>
      <Container sx={{ marginTop: "3rem" }}>
        <Text color="white" sx={{ fontSize: "2rem", textAlign: "center" }}>
          Account Settings
        </Text>

        <Center mt="xl">
          <TextInput
            label="username"
            styles={{
              label: {
                color: "white",
                display: "inline-block",
                width: "150px",
                textAlign: "left",
                fontSize: "1.2rem",
              },
              wrapper: {
                display: "inline-block",
              },
            }}
            disabled
            placeholder={user?.username}
          />
          <ActionIcon>
            <IconPencil />
          </ActionIcon>
        </Center>
        <Center mt="xl">
          <TextInput
            label="e-mail"
            styles={{
              label: {
                color: "white",
                display: "inline-block",
                width: "150px",
                textAlign: "left",
                fontSize: "1.2rem",
              },
              wrapper: {
                display: "inline-block",
              },
            }}
            disabled
            placeholder={user?.username}
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
