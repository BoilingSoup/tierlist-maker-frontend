import { useMantineTheme } from "@mantine/core";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { apiClient } from "../../../../lib/apiClient";
import {
  showSomethingWentWrongNotification,
  showSuccessNotification,
} from "../../../common/helpers";
import { ChangePasswordFormValues } from "../types";
import { useChangePasswordForm } from "./useChangePasswordForm";

export const useChangePasswordMutation = (
  form: ReturnType<typeof useChangePasswordForm>
) => {
  const theme = useMantineTheme();

  return useMutation(
    (values: ChangePasswordFormValues) => attemptChangePassword(values),
    {
      onSuccess: () => {
        form.reset();

        showSuccessNotification({
          theme,
          title: "Success",
          message: "Your password was changed.",
        });
      },
      onError: (e: AxiosError<{ message: string }>) => {
        const errorReceived = e.response?.data.message;
        const incorrectPasswordErrMsg = new RegExp(/password is incorrect/i); // Full error: "This password is incorrect."
        if (
          errorReceived !== undefined &&
          incorrectPasswordErrMsg.test(errorReceived)
        ) {
          form.setErrors({ current_password: errorReceived });
          return;
        }

        // NOTE: shouldn't reach here unless client is deliberately overriding client-side validation. Or network error.
        showSomethingWentWrongNotification(theme);
      },
    }
  );
};

const attemptChangePassword = async (values: ChangePasswordFormValues) => {
  return await apiClient.patch<void>("/user/change-password", values);
};
