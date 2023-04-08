import { Text } from "@mantine/core";
import type { NextPage } from "next";
import { AccountNavShell } from "../../components/account/AccountNavShell";
import { useRedirectIfUnauthenticated } from "../../components/common/hooks/useRedirectIfUnauthenticated";
import { useAuth } from "../../contexts/AuthProvider";

const Settings: NextPage = () => {
  const { user, isLoading } = useAuth();
  useRedirectIfUnauthenticated({ user, isLoading, redirectTo: "/" });

  return (
    <AccountNavShell>
      <Text color="white">
        {isLoading && "Loading..."}
        {user !== null ? JSON.stringify(user) : "You're not logged in"}
      </Text>
    </AccountNavShell>
  );
};

export default Settings;
