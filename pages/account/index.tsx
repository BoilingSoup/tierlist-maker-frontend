import { Center, Stack } from "@mantine/core";
import type { NextPage } from "next";
import { useAuth } from "../../contexts/AuthProvider";

const Account: NextPage = () => {
  const { user, isLoading } = useAuth();
  return (
    <>
      <Center>
        <Stack>
          <h1 style={{ textDecoration: "underline" }}>User</h1>
          <pre>{isLoading ? "Loading..." : JSON.stringify(user)}</pre>
        </Stack>
      </Center>
    </>
  );
};

export default Account;
