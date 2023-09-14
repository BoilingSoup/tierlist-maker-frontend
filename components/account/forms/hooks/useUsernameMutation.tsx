import { useMantineTheme } from "@mantine/core";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useAuth, UserDataServerResponse } from "../../../../contexts/AuthProvider";
import { apiClient } from "../../../../lib/apiClient";
import { showSomethingWentWrongNotification, showSuccessNotification } from "../../../common/helpers";
import { UsernameFormValues } from "../types";

export const useUsernameMutation = (closeForm: () => void) => {
  const { setUser } = useAuth();
  const theme = useMantineTheme();

  return useMutation((payload: UsernameFormValues) => attemptUpdateUsername(payload), {
    onSuccess: (userData) => {
      setUser(userData);
      closeForm();

      showSuccessNotification({
        theme,
        title: "Success",
        message: "Your username was changed.",
      });
    },
    onError: (e: AxiosError) => {
      // NOTE: Should only fail if throttled or there's a network error.
      showSomethingWentWrongNotification(theme);
    },
  });
};

const attemptUpdateUsername = async (payload: UsernameFormValues) => {
  const res = await apiClient.patch<UserDataServerResponse>("/user", payload);
  return res.data.data;
};
