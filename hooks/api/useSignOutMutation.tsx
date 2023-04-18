import { useMantineTheme } from "@mantine/core";
import { useMutation } from "react-query";
import { showSomethingWentWrongNotification } from "../../components/common/helpers";
import { useAuth } from "../../contexts/AuthProvider";
import { authClient } from "../../lib/apiClient";

export const useSignOutMutation = () => {
  const { setUser } = useAuth();
  const theme = useMantineTheme();

  return useMutation(attemptSignOut, {
    onSuccess: () => {
      setUser(null);
    },
    onError: () => {
      showSomethingWentWrongNotification(theme);
    },
  });
};

const attemptSignOut = async () => {
  const res = await authClient.post("/logout");
  return res.data;
};
