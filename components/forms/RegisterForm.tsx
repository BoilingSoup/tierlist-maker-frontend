import { Box, Button, Flex } from "@mantine/core";
import { ChangeEventHandler } from "react";
import { RegisterFormFields } from "../../hooks/auth/types";
import useRegisterForm from "../../hooks/auth/useRegisterForm";
import { useRegisterFormStore } from "../../hooks/store/useRegisterFormStore";
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

export const RegisterForm = () => {
  const form = useRegisterForm({ enableFloatingLabel: true });
  const updateFormState = useRegisterFormStore((state) => state.update);

  /** Update zustand state then excute default form onChange handler */
  const onChangeHandler =
    (input: RegisterFormFields): ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      updateFormState({ input, value: event.target.value });
      const defaultOnChange = form.getInputProps(input).onChange;
      if (defaultOnChange) defaultOnChange(event);
    };

  return (
    <form
      aria-label="registration form"
      style={formStyle}
      onSubmit={form.onSubmit(console.log)}
    >
      <Flex sx={formContentsContainerSx}>
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="E-mail"
            type="email"
            sx={fancyInputSx}
            styles={inputStyles}
            {...form.getInputProps("email")}
            onChange={onChangeHandler("email")}
          />
        </Box>
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
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="Confirm Password"
            type="password"
            sx={fancyInputSx}
            styles={inputStyles}
            {...form.getInputProps("confirmPassword")}
            onChange={onChangeHandler("confirmPassword")}
          />
        </Box>
        <Box sx={formSubmitControlSx}>
          <Button
            type="submit"
            sx={formSubmitSx}
            variant="gradient"
            gradient={formSubmitGradient}
          >
            Register
          </Button>
        </Box>
      </Flex>
    </form>
  );
};
