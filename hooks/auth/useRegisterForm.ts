import { useForm } from "@mantine/form";
import { useState } from "react";
import { validationRules } from "./constants";
import { FormParam, getInputProps } from "./form-helpers";

type FormFields = "email" | "username" | "password" | "confirmPassword";
type InputsFocusState = Record<FormFields, boolean>;
type FormValues = Record<FormFields, string>;

export default function useRegisterForm({ enableFloatingLabel }: FormParam) {
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: validationRules.email,
      username: validationRules.username,
      password: validationRules.password,
      confirmPassword: validationRules.confirmPassword,
    },

    validateInputOnBlur: true,
  });

  // Mantine useForm doesn't expose an input field's focus state. Probably for performance reasons.
  // So I create my own here.
  const [inputsFocusState, setInputsFocusState] = useState<InputsFocusState>({
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  return {
    ...form,
    // override getInputProps method with custom implementation to handle (optional) focus state
    getInputProps: (inputField: FormFields) =>
      getInputProps({
        inputField,
        form,
        enableFloatingLabel,
        inputsFocusState,
        setInputsFocusState,
      }),
  };
}
