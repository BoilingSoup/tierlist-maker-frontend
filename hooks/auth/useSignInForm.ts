import { useForm } from "@mantine/form";
import { useState } from "react";
import { useSignInFormStore } from "../store/useSignInFormStore";
import { validationRules } from "./constants";
import { FormParam, getInputProps } from "./form-helpers";
import { SignInFormFields, SignInFormValues } from "./types";

type InputsFocusState = Record<SignInFormFields, boolean>;

export const useSignInForm = ({ enableFloatingLabel }: FormParam) => {
  const formValues = useSignInFormStore((state) => state.values);

  const form = useForm<SignInFormValues>({
    initialValues: formValues,

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
    getInputProps: (inputField: SignInFormFields) =>
      getInputProps({
        inputField,
        form,
        enableFloatingLabel,
        inputsFocusState,
        setInputsFocusState,
      }),
  };
};
