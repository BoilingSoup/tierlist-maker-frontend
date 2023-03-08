import { useForm } from "@mantine/form";
import { useState } from "react";
import { passwordError, usernameError } from "./errorMessages";
import { FormParam, getInputProps } from "./form-helpers";

type FormFields = "username" | "password";
type InputsFocusState = Record<FormFields, boolean>;
type FormValues = Record<FormFields, string>;

export const useSignInForm = ({ enableFloatingLabel }: FormParam) => {
  const form = useForm<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) => (value !== "" ? null : usernameError),
      password: (value) => (value.length > 2 ? null : passwordError),
    },
  });

  const [inputsFocusState, setInputsFocusState] = useState<InputsFocusState>({
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
};
