import { showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import { useAuth, User } from "../../contexts/AuthProvider";
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

  return useMutation((values: SignInFormValues) => attemptSignIn(values), {
    onSuccess: (userData) => {
      setDisableSubmit(true);
      setUser(userData);

      router.push("/");

      // TODO: check if verified, etc.
      showNotification({
        color: "lime",
        title: "Success!",
        message: "Welcome back",
      });
    },
    onError: (e: AxiosError<{ message: string }>) => {
      const errorReceived = e.response?.data.message;
      // TODO: set errors
      console.log(errorReceived);
    },
  });
};

const attemptSignIn = async (values: SignInFormValues) => {
  const res = await authClient.post<User>("/login", values);
  return res.data;
};
