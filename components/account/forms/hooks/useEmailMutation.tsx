import { useMantineTheme } from "@mantine/core";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useAuth, UserDataServerResponse } from "../../../../contexts/AuthProvider";
import { apiClient } from "../../../../lib/apiClient";
import { queryKeys } from "../../../../lib/queryKeys";
import { showSomethingWentWrongNotification, showVerifyAccountNotification } from "../../../common/helpers";
import { EmailFormValues } from "../types";
import { useEmailForm } from "./useEmailForm";

type Param = {
  close: () => void;
  form: ReturnType<typeof useEmailForm>;
};

export const useEmailMutation = ({ close: closeForm, form }: Param) => {
  const { user, setUser } = useAuth();
  const theme = useMantineTheme();

  const queryClient = useQueryClient();

  return useMutation((payload: EmailFormValues) => attemptUpdateEmail(payload), {
    onSuccess: (userData) => {
      queryClient.removeQueries(queryKeys.userTierLists(user?.id ?? ""));

      setUser(userData);

      closeForm();
      showVerifyAccountNotification({ theme, user: userData });
    },
    onError: (e: AxiosError<{ message: string }>) => {
      const errorReceived = e.response?.data.message;
      const emailDuplicateErrMsg = new RegExp(/email is already/i); // Full error: "This email is already in use."
      if (errorReceived !== undefined && emailDuplicateErrMsg.test(errorReceived)) {
        form.setErrors({ email: errorReceived });
        return;
      }

      // NOTE: shouldn't reach here unless client is deliberately overriding client-side validation. Or network error.
      showSomethingWentWrongNotification(theme);
    },
  });
};

const attemptUpdateEmail = async (payload: EmailFormValues) => {
  const res = await apiClient.patch<UserDataServerResponse>("/user", payload);
  return res.data.data;
};
