import { Box, Button, Center, Group, Stack } from "@mantine/core";
import useRegisterForm from "../../hooks/auth/useRegisterForm";
import { formContentsContainerSx, formStyle } from "../auth/styles";
import { FancyInput } from "./FancyInput";
import { formSubmitProps } from "./styles";

const fancyInputSx = { width: "80%", margin: "auto" };
const formControlSx = { width: "100%", height: "60px" };

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
            {...form.getInputProps("email")}
          />
        </Box>
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="Username"
            sx={fancyInputSx}
            {...form.getInputProps("username")}
          />
        </Box>
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="Password"
            type="password"
            sx={fancyInputSx}
            {...form.getInputProps("password")}
          />
        </Box>
        <Box sx={formControlSx}>
          <FancyInput
            withAsterisk
            label="Confirm Password"
            type="password"
            sx={fancyInputSx}
            {...form.getInputProps("confirmPassword")}
          />
        </Box>
        <Group {...formSubmitProps}>
          <Button type="submit">Submit</Button>
        </Group>
        <Center mt={60} sx={{ fontSize: "2rem" }}>
          Oauth stuff goes here
        </Center>
      </Stack>
    </form>
  );
};
