import { useMutation } from "react-query";
import {
  useAuth,
  UserDataServerResponse,
} from "../../../../contexts/AuthProvider";
import { apiClient } from "../../../../lib/apiClient";
import { UsernameFormValues } from "../types";

export const useUsernameMutation = (closeForm: () => void) => {
  const { setUser } = useAuth();

  return useMutation(
    (payload: UsernameFormValues) => attemptUpdateUsername(payload),
    {
      onSuccess: (userData) => {
        setUser(userData);

        closeForm();
      },
      // TODO: onError show notification
    }
  );
};

const attemptUpdateUsername = async (payload: UsernameFormValues) => {
  const res = await apiClient.patch<UserDataServerResponse>("/user", payload);
  return res.data.data;
};
