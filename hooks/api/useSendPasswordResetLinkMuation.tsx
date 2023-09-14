import { useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { showSomethingWentWrongNotification, showSuccessNotification } from "../../components/common/helpers";
import { authClient } from "../../lib/apiClient";
import { ForgotPasswordFormValues } from "../auth/types";
import { useForgotPasswordForm } from "../auth/useForgotPasswordForm";

export const useSendPasswordResetLinkMutation = (form: ReturnType<typeof useForgotPasswordForm>) => {
  const theme = useMantineTheme();
  const router = useRouter();

  return useMutation((values: ForgotPasswordFormValues) => sendPasswordResetLink(values), {
    onSuccess: () => {
      showSuccessNotification({
        theme,
        title: "Password reset link sent!",
        message: "Please check your email to reset your password.",
      });
      form.reset();
      router.push("/");
    },
    onError: () => {
      showSomethingWentWrongNotification(theme);
    },
  });
};

const successMsg = "We have emailed your password reset link.";

type SuccessBody = {
  status: typeof successMsg;
};

const sendPasswordResetLink = async (values: ForgotPasswordFormValues) => {
  const ret = await authClient.post<SuccessBody>("/forgot-password", values);
  return ret.data;
};
