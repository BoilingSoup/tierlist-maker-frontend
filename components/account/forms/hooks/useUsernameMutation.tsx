import { useMutation } from "react-query";
import {
  useAuth,
  User,
  UserDataServerResponse,
} from "../../../../contexts/AuthProvider";
import { apiClient } from "../../../../lib/apiClient";

type Payload = {
  username: string;
};

export const useUsernameMutation = (closeForm: () => void) => {
  const { setUser } = useAuth();

  return useMutation((payload: Payload) => attemptUpdateUsername(payload), {
    onSuccess: (_, payload) => {
      setUser((prev) => {
        if (prev === null) return prev;

        const user: User = { ...prev };
        user.username = payload.username;

        return user;
      });

      closeForm();
    },
    // TODO: onError show notification
  });
};

const attemptUpdateUsername = async (payload: Payload) => {
  const res = await apiClient.patch<UserDataServerResponse>("/user", payload);
  return res.data.data;
};
