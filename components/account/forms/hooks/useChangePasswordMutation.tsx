import { useMantineTheme } from "@mantine/core";
import { useMutation } from "react-query";
import { apiClient } from "../../../../lib/apiClient";
import { showSuccessNotification } from "../../../common/helpers";
import { ChangePasswordFormValues } from "../types";

export const useChangePasswordMutation = (formReset: () => void) => {
  const theme = useMantineTheme();

  return useMutation(
    (values: ChangePasswordFormValues) => attemptChangePassword(values),
    {
      onSuccess: () => {
        formReset();

        showSuccessNotification({
          theme,
          title: "Success",
          message: "Your password was changed.",
        });
      },
      onError: (err) => {
        // TODO: show error message on inputs or notification
        console.log("error:", err);
      },
    }
  );
};

const attemptChangePassword = async (values: ChangePasswordFormValues) => {
  return await apiClient.patch<void>("/user/change-password", values);
};
