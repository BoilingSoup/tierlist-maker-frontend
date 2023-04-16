import { useMutation } from "react-query";
import { apiClient } from "../../../../lib/apiClient";
import { ChangePasswordFormValues } from "../types";

export const useChangePasswordMutation = (formReset: () => void) => {
  return useMutation(
    (values: ChangePasswordFormValues) => attemptChangePassword(values),
    {
      onSuccess: () => {
        // TODO: show success notification & clear form inputs
        formReset();
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
