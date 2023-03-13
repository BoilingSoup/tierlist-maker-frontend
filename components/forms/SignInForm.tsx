import { Box, Button, Flex } from "@mantine/core";
import { ChangeEventHandler } from "react";
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
      onSubmit={form.onSubmit(console.log)}
    >
      <Flex sx={formContentsContainerSx}>
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="Username"
            sx={fancyInputSx}
            styles={inputStyles}
            {...form.getInputProps("username")}
            onChange={onChangeHandler("username")}
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
          >
            Sign In
          </Button>
        </Box>
      </Flex>
    </form>
  );
};
