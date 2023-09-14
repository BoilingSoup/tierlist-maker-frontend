import { useMantineTheme } from "@mantine/core";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import {
  showErrorNotification,
  showSomethingWentWrongNotification,
  showSuccessNotification,
  showVerifyAccountNotification,
} from "../../components/common/helpers";
import { useAuth, UserDataServerResponse } from "../../contexts/AuthProvider";
import { authClient } from "../../lib/apiClient";
import { SignInFormValues } from "../auth/types";

type Param = {
  setDisableSubmit: Dispatch<SetStateAction<boolean>>;
};

export const useSignInMutation = ({ setDisableSubmit }: Param) => {
  const { setUser } = useAuth();
  const router = useRouter();
  const theme = useMantineTheme();

  return useMutation((values: SignInFormValues & { remember: boolean }) => attemptSignIn(values), {
    onSuccess: (userData) => {
      setDisableSubmit(true);
      setUser(userData);

      router.push("/");

      if (userData?.email_verified) {
        showSuccessNotification({
          theme,
          title: "Success",
          message: "Welcome back!",
        });
      } else {
        showVerifyAccountNotification({ theme, user: userData });
      }
    },
    onError: (e: AxiosError<{ message: string }>) => {
      const errorReceived = e.response?.data.message;
      const invalidCredentialsErrMsg = new RegExp(/credentials do not match/i); // Full error: "These credentials do not match our records."

      if (errorReceived !== undefined && invalidCredentialsErrMsg.test(errorReceived)) {
        showErrorNotification({
          theme,
          title: "Error",
          message: "Invalid credentials.",
        });
        return;
      }

      showSomethingWentWrongNotification(theme);
    },
  });
};

const attemptSignIn = async (values: SignInFormValues & { remember: boolean }) => {
  const res = await authClient.post<UserDataServerResponse>("/login", values);
  return res.data.data;
};
