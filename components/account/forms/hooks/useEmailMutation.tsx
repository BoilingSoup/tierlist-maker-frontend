import { useMutation } from "react-query";
import {
  useAuth,
  UserDataServerResponse,
} from "../../../../contexts/AuthProvider";
import { apiClient } from "../../../../lib/apiClient";

type Payload = {
  email: string;
};

export const useEmailMutation = (closeForm: () => void) => {
  const { setUser } = useAuth();

  return useMutation((payload: Payload) => attemptUpdateEmail(payload), {
    onSuccess: (userData) => {
      setUser(userData);

      closeForm();
      // TODO: show success notification
      // TODO: show verification email sent notification
    },
    // TODO: onError show notification
  });
};

const attemptUpdateEmail = async (payload: Payload) => {
  const res = await apiClient.patch<UserDataServerResponse>("/user", payload);
  return res.data.data;
};
