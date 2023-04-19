import { useForm } from "@mantine/form";
import { useState } from "react";
import { validationRules } from "./constants";
import { FormParam, getInputProps } from "./form-helpers";
import { PasswordResetFormFields, PasswordResetFormValues } from "./types";

type InputsFocusState = Record<PasswordResetFormFields, boolean>;

export const usePasswordResetForm = ({ enableFloatingLabel }: FormParam) => {
  const form = useForm<PasswordResetFormValues>({
    initialValues: {
      password: "",
      password_confirmation: "",
    },

    validate: {
      password: validationRules.password,
      password_confirmation: validationRules.password_confirmation,
    },

    validateInputOnBlur: true,
  });

  const [inputsFocusState, setInputsFocusState] = useState<InputsFocusState>({
    password: false,
    password_confirmation: false,
  });

  return {
    ...form,
    getInputProps: (inputField: PasswordResetFormFields) =>
      getInputProps({
        inputField,
        form,
        enableFloatingLabel,
        inputsFocusState,
        setInputsFocusState,
      }),
  };
};
