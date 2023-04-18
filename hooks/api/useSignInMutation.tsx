import { useMantineTheme } from "@mantine/core";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../components/common/helpers";
import { useAuth, UserDataServerResponse } from "../../contexts/AuthProvider";
import { authClient } from "../../lib/apiClient";
import { SignInFormValues } from "../auth/types";
import { useSignInForm } from "../auth/useSignInForm";

type Param = {
  form: ReturnType<typeof useSignInForm>;
  setDisableSubmit: Dispatch<SetStateAction<boolean>>;
};

export const useSignInMutation = ({ form, setDisableSubmit }: Param) => {
  const { setUser } = useAuth();
  const router = useRouter();
  const theme = useMantineTheme();

  return useMutation((values: SignInFormValues) => attemptSignIn(values), {
    onSuccess: (userData) => {
      setDisableSubmit(true);
      setUser(userData);

      router.push("/");

      // TODO: check if verified, etc.
      showSuccessNotification({
        theme,
        title: "Success",
        message: "Welcome back!",
      });
    },
    onError: (e: AxiosError<{ message: string }>) => {
      const errorReceived = e.response?.data.message;
      const invalidCredentialsErrMsg = new RegExp(/credentials do not match/i); // Full error: "These credentials do not match our records."

      if (
        errorReceived !== undefined &&
        invalidCredentialsErrMsg.test(errorReceived)
      ) {
        showErrorNotification({
          theme,
          title: "Error",
          message: "Invalid credentials.",
        });
        return;
      }
    },
  });
};

const attemptSignIn = async (values: SignInFormValues) => {
  const res = await authClient.post<UserDataServerResponse>("/login", values);
  return res.data.data;
};
