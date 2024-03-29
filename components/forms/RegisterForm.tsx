import { Box, Button, Flex, Loader } from "@mantine/core";
import { ChangeEventHandler, useState } from "react";
import { useRegisterMutation } from "../../hooks/api/useRegisterMutation";
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
  const [disableSubmit, setDisableSubmit] = useState(false);
  const { mutate: register, isLoading } = useRegisterMutation({
    form,
    setDisableSubmit,
  });

  /** Update zustand state then excute default form onChange handler */
  const onChangeHandler =
    (input: RegisterFormFields): ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      updateFormState({ input, value: event.target.value });
      const defaultOnChange = form.getInputProps(input).onChange;
      if (defaultOnChange) defaultOnChange(event);
    };

  return (
    <form aria-label="registration form" style={formStyle} onSubmit={form.onSubmit((values) => register(values))}>
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
            {...form.getInputProps("password_confirmation")}
            onChange={onChangeHandler("password_confirmation")}
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
            {isLoading || disableSubmit ? <Loader size="xs" /> : "Register"}
          </Button>
        </Box>
      </Flex>
    </form>
  );
};
