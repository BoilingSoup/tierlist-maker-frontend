import { useMantineTheme } from "@mantine/core";
import { useMutation } from "react-query";
import { useAuth } from "../../../../contexts/AuthProvider";
import { authClient } from "../../../../lib/apiClient";
import { showInfoNotification, showSomethingWentWrongNotification } from "../../../common/helpers";

export const useResendVerificationEmail = () => {
  const theme = useMantineTheme();
  const { user } = useAuth();

  return useMutation(resendVerificationEmail, {
    onSuccess: (resp) => {
      if (resp.status === successMsg) {
        showInfoNotification({
          theme,
          title: "Email sent",
          message: `Please verify your acount with the email sent to ${user?.email}`,
        });
      }
    },
    onError: () => {
      showSomethingWentWrongNotification(theme);
    },
  });
};

const successMsg = "verification-link-sent";

type SuccessResp = {
  status: typeof successMsg;
};

const resendVerificationEmail = async () => {
  const ret = await authClient.post<SuccessResp>("/email/verification-notification");
  return ret.data;
};
