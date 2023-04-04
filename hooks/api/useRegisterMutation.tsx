import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useAuth, User } from "../../contexts/AuthProvider";
import { authClient } from "../../lib/apiClient";
import { RegisterFormValues } from "../auth/types";

export const useRegisterMutation = () => {
  const { setUser } = useAuth();

  return useMutation((values: RegisterFormValues) => attemptRegister(values), {
    onSuccess: (v) => {
      console.log(v);
    },
    onError: (e: AxiosError) => {
      console.log(e.response?.status);
    },
  });
};

const attemptRegister = async (values: RegisterFormValues) => {
  console.log(values);
  const res = await authClient.post<User>("/register", values);
  return res.data;
};
