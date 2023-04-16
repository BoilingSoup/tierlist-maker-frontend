import { useMutation } from "react-query";
import {
  useAuth,
  UserDataServerResponse,
} from "../../../../contexts/AuthProvider";
import { apiClient } from "../../../../lib/apiClient";
import { EmailFormValues } from "../types";

export const useEmailMutation = (closeForm: () => void) => {
  const { setUser } = useAuth();

  return useMutation(
    (payload: EmailFormValues) => attemptUpdateEmail(payload),
    {
      onSuccess: (userData) => {
        setUser(userData);

        closeForm();
        // TODO: show success notification
        // TODO: show verification email sent notification
      },
      // TODO: onError show notification
    }
  );
};

const attemptUpdateEmail = async (payload: EmailFormValues) => {
  const res = await apiClient.patch<UserDataServerResponse>("/user", payload);
  return res.data.data;
};
