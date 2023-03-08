import { useForm } from "@mantine/form";
import { useState } from "react";
import { validationRules } from "./constants";
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
      username: validationRules.username,
      password: validationRules.password,
    },

    validateInputOnBlur: true,
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
