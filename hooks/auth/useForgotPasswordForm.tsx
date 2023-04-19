import { useForm } from "@mantine/form";
import { useState } from "react";
import { validationRules } from "./constants";
import { FormParam, getInputProps } from "./form-helpers";
import { ForgotPasswordFormFields, ForgotPasswordFormValues } from "./types";

type InputsFocusState = Record<ForgotPasswordFormFields, boolean>;

export const useForgotPasswordForm = ({ enableFloatingLabel }: FormParam) => {
  const form = useForm<ForgotPasswordFormValues>({
    initialValues: {
      email: "",
    },
    validate: {
      email: validationRules.email,
    },
    validateInputOnBlur: true,
  });

  // Mantine useForm doesn't expose an input field's focus state. Probably for performance reasons.
  // So I create my own here.
  const [inputsFocusState, setInputsFocusState] = useState<InputsFocusState>({
    email: false,
  });

  return {
    ...form,
    getInputProps: (inputField: ForgotPasswordFormFields) =>
      getInputProps({
        inputField,
        form,
        enableFloatingLabel,
        inputsFocusState,
        setInputsFocusState,
      }),
  };
};
