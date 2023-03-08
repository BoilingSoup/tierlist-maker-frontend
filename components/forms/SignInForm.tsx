import { Button, Center, Group, Stack } from "@mantine/core";
import { useSignInForm } from "../../hooks/auth/useSignInForm";
import { formContentsContainerSx, formStyle } from "../auth/styles";
import { FancyInput } from "./FancyInput";
import { formSubmitProps } from "./styles";

const fancyInputSx = { width: "80%", margin: "20px" };

export const SignInForm = () => {
  const form = useSignInForm({ enableFloatingLabel: true });

  return (
    <form style={formStyle} onSubmit={form.onSubmit(console.log)}>
      <Stack sx={formContentsContainerSx}>
        <FancyInput
          withAsterisk
          label="Username"
          sx={fancyInputSx}
          {...form.getInputProps("username")}
        />
        <FancyInput
          withAsterisk
          label="Password"
          type="password"
          sx={fancyInputSx}
          {...form.getInputProps("password")}
        />
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
