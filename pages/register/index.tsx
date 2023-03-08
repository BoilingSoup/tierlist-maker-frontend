import { Title, Box, Center, Stack } from "@mantine/core";
import { NextPage } from "next";
import {
  authTitleSx,
  backdropBoxSx,
  formContainerSx,
  formPageContainerSx,
} from "../../components/auth/styles";
import { FormTabs } from "../../components/forms/FormTabs";
import { RegisterForm } from "../../components/forms/RegisterForm";

const Register: NextPage = () => {
  return (
    <Center sx={formPageContainerSx}>
      <Box top={10} left={-300} sx={backdropBoxSx} />
      <Box top={200} left={-300} sx={backdropBoxSx} />
      <Box top={-300} left={200} sx={backdropBoxSx} />
      <Stack sx={formContainerSx}>
        <Title sx={authTitleSx}>Registration</Title>
        <FormTabs />
        <RegisterForm />
      </Stack>
    </Center>
  );
};

export default Register;
