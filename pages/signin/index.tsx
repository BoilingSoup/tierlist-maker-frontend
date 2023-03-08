import { Title, Group, Button, Box, Center, Stack } from "@mantine/core";
import { NextPage } from "next";
import {
  authTitleSx,
  backdropBoxSx,
  formContainerSx,
  formContentsContainerSx,
  formPageContainerSx,
  formStyle,
} from "../../components/auth/styles";
import { FancyInput } from "../../components/forms/FancyInput";
import { FormTabs } from "../../components/forms/FormTabs";
import { formSubmitProps } from "../../components/forms/styles";
import { useSignInForm } from "../../hooks/auth/useSignInForm";

const fancyInputSx = { width: "80%", margin: "20px" };

const SignIn: NextPage = () => {
  const form = useSignInForm({ enableFloatingLabel: true });

  return (
    <Center sx={formPageContainerSx}>
      <Box top={10} left={-300} sx={backdropBoxSx} />
      <Box top={200} left={-300} sx={backdropBoxSx} />
      <Box top={-300} left={200} sx={backdropBoxSx} />
      <Stack sx={formContainerSx}>
        <Title sx={authTitleSx}>Sign In</Title>
        <FormTabs />
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
      </Stack>
    </Center>
  );
};
export default SignIn;
