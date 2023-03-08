import { isEmail, useForm } from "@mantine/form";
import { useState } from "react";
import { usernameError, emailError, passwordError } from "./errorMessages";
import { FormParam, getInputProps } from "./form-helpers";

type FormFields = "email" | "username" | "password";
type InputsFocusState = Record<FormFields, boolean>;
type FormValues = Record<FormFields, string>;

export default function useRegisterForm({ enableFloatingLabel }: FormParam) {
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },

    validate: {
      email: isEmail(emailError),
      username: (value) => (value !== "" ? null : usernameError),
      password: (value) => (value.length > 2 ? null : passwordError),
    },
  });

  // Mantine useForm doesn't expose an input field's focus state. Probably for performance reasons.
  // So I create my own here.
  const [inputsFocusState, setInputsFocusState] = useState<InputsFocusState>({
    email: false,
    username: false,
    password: false,
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
