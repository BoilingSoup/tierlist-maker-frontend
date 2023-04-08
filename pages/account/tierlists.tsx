import { Text } from "@mantine/core";
import type { NextPage } from "next";
import { AccountNavShell } from "../../components/account/AccountNavShell";
import { useRedirectIfUnauthenticated } from "../../components/common/hooks/useRedirectIfUnauthenticated";
import { useAuth } from "../../contexts/AuthProvider";

const TierLists: NextPage = () => {
  const { user, isLoading } = useAuth();
  useRedirectIfUnauthenticated({ user, isLoading, redirectTo: "/" });

  return (
    <AccountNavShell>
      <Text color="white">TESTTESTTESTESTTESTTESTESTTESTSTEST</Text>
    </AccountNavShell>
  );
};

export default TierLists;
