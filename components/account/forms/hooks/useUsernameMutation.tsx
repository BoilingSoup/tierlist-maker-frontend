import { useMantineTheme } from "@mantine/core";
import { useMutation } from "react-query";
import { useAuth, UserDataServerResponse } from "../../../../contexts/AuthProvider";
import { useRefetchQueries } from "../../../../hooks/api/useRefetchQueries";
import { useResetQueries } from "../../../../hooks/api/useResetQueries";
import { apiClient } from "../../../../lib/apiClient";
import { queryKeys } from "../../../../lib/queryKeys";
import { showSomethingWentWrongNotification, showSuccessNotification } from "../../../common/helpers";
import { UsernameFormValues } from "../types";

export const useUsernameMutation = (closeForm: () => void) => {
  const { setUser } = useAuth();
  const theme = useMantineTheme();

  const resetQueries = useResetQueries();
  const refetchQueries = useRefetchQueries();

  return useMutation((payload: UsernameFormValues) => attemptUpdateUsername(payload), {
    onSuccess: (userData) => {
      resetQueries(queryKeys.recentTierLists());
      refetchQueries(queryKeys.recentTierLists());

      setUser(userData);
      closeForm();

      showSuccessNotification({
        theme,
        title: "Success",
        message: "Your username was changed.",
      });
    },
    onError: () => {
      showSomethingWentWrongNotification(theme);
    },
  });
};

const attemptUpdateUsername = async (payload: UsernameFormValues) => {
  const res = await apiClient.patch<UserDataServerResponse>("/user", payload);
  return res.data.data;
};
