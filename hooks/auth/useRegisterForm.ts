import { useForm } from "@mantine/form";
import { useState } from "react";
import { useRegisterFormStore } from "../store/useRegisterFormStore";
import { validationRules } from "./constants";
import { FormParam, getInputProps } from "./form-helpers";
import { RegisterFormFields, RegisterFormValues } from "./types";

type InputsFocusState = Record<RegisterFormFields, boolean>;

export default function useRegisterForm({ enableFloatingLabel }: FormParam) {
  const formValues = useRegisterFormStore((state) => state.values);

  const form = useForm<RegisterFormValues>({
    initialValues: formValues,

    validate: {
      email: validationRules.email,
      username: validationRules.username,
      password: validationRules.password,
      password_confirmation: validationRules.password_confirmation,
    },

    validateInputOnBlur: true,
  });

  // Mantine useForm doesn't expose an input field's focus state. Probably for performance reasons.
  // So I create my own here.
  const [inputsFocusState, setInputsFocusState] = useState<InputsFocusState>({
    email: false,
    username: false,
    password: false,
    password_confirmation: false,
  });

  return {
    ...form,
    // override getInputProps method with custom implementation to handle (optional) focus state
    getInputProps: (inputField: RegisterFormFields) =>
      getInputProps({
        inputField,
        form,
        enableFloatingLabel,
        inputsFocusState,
        setInputsFocusState,
      }),
  };
}
