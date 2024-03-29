import { useMantineTheme } from "@mantine/core";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import { showSomethingWentWrongNotification, showVerifyAccountNotification } from "../../components/common/helpers";
import { useAuth, UserDataServerResponse } from "../../contexts/AuthProvider";
import { authClient } from "../../lib/apiClient";
import { RegisterFormValues } from "../auth/types";
import useRegisterForm from "../auth/useRegisterForm";

type Param = {
  form: ReturnType<typeof useRegisterForm>;
  setDisableSubmit: Dispatch<SetStateAction<boolean>>;
};

export const useRegisterMutation = ({ form, setDisableSubmit }: Param) => {
  const { setUser } = useAuth();
  const router = useRouter();
  const theme = useMantineTheme();

  return useMutation(attemptRegister, {
    onSuccess: (userData) => {
      setDisableSubmit(true);
      setUser(userData);

      router.push("/");

      showVerifyAccountNotification({ theme, user: userData });
    },
    onError: (e: AxiosError<{ message: string }>) => {
      const errorReceived = e.response?.data.message;
      const emailDuplicateErrMsg = new RegExp(/email is already/i); // Full error: "This email is already in use."
      if (errorReceived !== undefined && emailDuplicateErrMsg.test(errorReceived)) {
        form.setErrors({ email: errorReceived });
        return;
      }

      // NOTE: shouldn't reach here unless client is deliberately overriding client-side validation. Or network error.
      showSomethingWentWrongNotification(theme);
    },
  });
};

const attemptRegister = async (values: RegisterFormValues) => {
  const res = await authClient.post<UserDataServerResponse>("/register", values);
  return res.data.data;
};
