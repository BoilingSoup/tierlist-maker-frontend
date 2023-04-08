import { Center, Text } from "@mantine/core";
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
      {userIsLoaded && (
        <Center sx={{ width: "100%", height: "100%" }}>
          <Text color="white">{user.username}</Text>
        </Center>
      )}
    </AccountNavShell>
  );
};

export default Settings;
