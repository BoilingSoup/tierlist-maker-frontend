import { Title, Box, Center, Stack } from "@mantine/core";
import { NextPage } from "next";
import {
  authTitleSx,
  backdropBoxSx,
  formContainerSx,
  formPageContainerSx,
} from "../../components/auth/styles";
import { FormTabs } from "../../components/forms/FormTabs";
import { SignInForm } from "../../components/forms/SignInForm";

const SignIn: NextPage = () => {
  return (
    <Center sx={formPageContainerSx}>
      <Box top={10} left={-300} sx={backdropBoxSx} />
      <Box top={200} left={-300} sx={backdropBoxSx} />
      <Box top={-300} left={200} sx={backdropBoxSx} />
      <Stack sx={formContainerSx}>
        <Title sx={authTitleSx}>Sign In</Title>
        <FormTabs />
        <SignInForm />
      </Stack>
    </Center>
  );
};
export default SignIn;
