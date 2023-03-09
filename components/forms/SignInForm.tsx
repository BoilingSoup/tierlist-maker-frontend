import { Box, Button, Stack } from "@mantine/core";
import { useSignInForm } from "../../hooks/auth/useSignInForm";
import {
  fancyInputSx,
  formContentsContainerSx,
  formControlSx,
  formStyle,
  formSubmitGradient,
  formSubmitSx,
  inputStyles,
} from "../forms/styles";
import { FancyInput } from "./FancyInput";

export const SignInForm = () => {
  const form = useSignInForm({ enableFloatingLabel: true });

  return (
    <form style={formStyle} onSubmit={form.onSubmit(console.log)}>
      <Stack sx={formContentsContainerSx}>
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="Username"
            sx={fancyInputSx}
            styles={inputStyles}
            {...form.getInputProps("username")}
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
          />
        </Box>
        <Box sx={{ ...formControlSx, height: "auto" }}>
          <Button
            type="submit"
            sx={formSubmitSx}
            variant="gradient"
            gradient={formSubmitGradient}
          >
            Sign In
          </Button>
        </Box>
        {/* <Center mt={60} sx={{ fontSize: "2rem" }}> */}
        {/*   Oauth stuff goes here */}
        {/* </Center> */}
      </Stack>
    </form>
  );
};
