import { useForm } from "@mantine/form";
import { validationRules } from "../../../../hooks/auth/constants";
import { ChangePasswordFormValues } from "../types";

export const useChangePasswordForm = () => {
  return useForm<ChangePasswordFormValues>({
    initialValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
    validate: {
      current_password: validationRules.password,
      password: validationRules.password,
      password_confirmation: validationRules.password_confirmation,
    },
    validateInputOnBlur: true,
  });
};
