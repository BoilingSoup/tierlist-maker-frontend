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
import { formSubmitProps } from "../../components/forms/styles";
import useRegisterForm from "../../hooks/auth/useRegisterForm";

const fancyInputSx = { width: "80%", margin: "20px" };

const Register: NextPage = () => {
  const form = useRegisterForm({ enableFloatingLabel: true });

  return (
    <Center sx={formPageContainerSx}>
      <Box top={10} left={-300} sx={backdropBoxSx} />
      <Box top={200} left={-300} sx={backdropBoxSx} />
      <Box top={-300} left={200} sx={backdropBoxSx} />
      <Stack sx={formContainerSx}>
        <Title sx={authTitleSx}>Register</Title>
        <form style={formStyle} onSubmit={form.onSubmit(console.log)}>
          <Stack sx={formContentsContainerSx}>
            <FancyInput
              withAsterisk
              label="E-mail"
              type="email"
              sx={fancyInputSx}
              {...form.getInputProps("email")}
            />
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
            <FancyInput
              withAsterisk
              label="Confirm Password"
              type="password"
              sx={fancyInputSx}
              {...form.getInputProps("confirmPassword")}
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

export default Register;
