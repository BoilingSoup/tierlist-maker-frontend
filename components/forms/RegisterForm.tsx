import {
  Box,
  Button,
  Stack,
  Styles,
  TextInputStylesNames,
} from "@mantine/core";
import useRegisterForm from "../../hooks/auth/useRegisterForm";
import { formContentsContainerSx, formStyle } from "../forms/styles";
import { FancyInput } from "./FancyInput";

const fancyInputSx = {
  width: "100%",
  margin: "auto",
};
const inputBoxShadow: Styles<TextInputStylesNames, Record<string, any>> = {
  input: {
    boxShadow: "3px 3px 6px -4px rgba(0,0,0,0.80)",
  },
};
const formControlSx = {
  width: "80%",
  height: "85px",
};

export const RegisterForm = () => {
  const form = useRegisterForm({ enableFloatingLabel: true });

  return (
    <form style={formStyle} onSubmit={form.onSubmit(console.log)}>
      <Stack sx={formContentsContainerSx}>
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="E-mail"
            type="email"
            sx={fancyInputSx}
            styles={inputBoxShadow}
            {...form.getInputProps("email")}
          />
        </Box>
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="Username"
            sx={fancyInputSx}
            styles={inputBoxShadow}
            {...form.getInputProps("username")}
          />
        </Box>
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="Password"
            type="password"
            sx={fancyInputSx}
            styles={inputBoxShadow}
            {...form.getInputProps("password")}
          />
        </Box>
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="Confirm Password"
            type="password"
            sx={fancyInputSx}
            styles={inputBoxShadow}
            {...form.getInputProps("confirmPassword")}
          />
        </Box>
        <Box sx={{ ...formControlSx, height: "auto" }}>
          <Button
            type="submit"
            sx={{
              display: "block",
              width: "100%",
              boxShadow: "6px 6px 8px -4px rgba(0,0,0,0.80)",
            }}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            Register
          </Button>
        </Box>
      </Stack>
    </form>
  );
};
