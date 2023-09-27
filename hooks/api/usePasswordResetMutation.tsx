import { useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { showErrorNotification, showSuccessNotification } from "../../components/common/helpers";
import { authClient } from "../../lib/apiClient";
import { PasswordResetPayload } from "../auth/types";

export const usePasswordResetMutation = () => {
  const theme = useMantineTheme();
  const router = useRouter();

  return useMutation(passwordReset, {
    onSuccess: () => {
      showSuccessNotification({
        theme,
        title: "Success",
        message: "Your password was reset successfully.",
      });
      router.push("/signin");
    },
    onError: () => {
      showErrorNotification({
        theme,
        title: "Error",
        message: "Invalid or expired token.",
      });
    },
  });
};

type SuccessMsg = {
  status: "Your password was reset successfully.";
};

const passwordReset = async (values: PasswordResetPayload) => {
  const ret = await authClient.post<SuccessMsg>("/reset-password", values);
  return ret.data;
};
