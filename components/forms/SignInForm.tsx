import { Box, Button, Flex, Loader } from "@mantine/core";
import { ChangeEventHandler, useState } from "react";
import { useSignInMutation } from "../../hooks/api/useSignInMutation";
import { SignInFormFields } from "../../hooks/auth/types";
import { useSignInForm } from "../../hooks/auth/useSignInForm";
import { useSignInFormStore } from "../../hooks/store/useSignInFormStore";
import {
  fancyInputSx,
  formContentsContainerSx,
  formControlSx,
  formStyle,
  formSubmitControlSx,
  formSubmitGradient,
  formSubmitSx,
  inputStyles,
} from "../forms/styles";
import { FancyInput } from "./FancyInput";

export const SignInForm = () => {
  const form = useSignInForm({ enableFloatingLabel: true });
  const updateFormState = useSignInFormStore((state) => state.update);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const { mutate: signIn, isLoading } = useSignInMutation({
    form,
    setDisableSubmit,
  });

  /** Update zustand state then excute default form onChange handler */
  const onChangeHandler =
    (input: SignInFormFields): ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      updateFormState({ input, value: event.target.value });
      const defaultOnChange = form.getInputProps(input).onChange;
      if (defaultOnChange) defaultOnChange(event);
    };

  return (
    <form
      aria-label="sign in form"
      style={formStyle}
      onSubmit={form.onSubmit((values) => signIn(values))}
    >
      <Flex sx={formContentsContainerSx}>
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="Email"
            sx={fancyInputSx}
            styles={inputStyles}
            {...form.getInputProps("email")}
            onChange={onChangeHandler("email")}
          />
        </Box>
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="Password"
            type="password"
            sx={fancyInputSx}
            styles={inputStyles}
            {...form.getInputProps("password")}
            onChange={onChangeHandler("password")}
          />
        </Box>
        <Box sx={formSubmitControlSx}>
          <Button
            type="submit"
            sx={formSubmitSx}
            variant="gradient"
            gradient={formSubmitGradient}
            disabled={isLoading || disableSubmit}
          >
            {isLoading || disableSubmit ? <Loader size="xs" /> : "Sign In"}
          </Button>
        </Box>
      </Flex>
    </form>
  );
};
