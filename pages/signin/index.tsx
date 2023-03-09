import { Title, Center, Flex } from "@mantine/core";
import { NextPage } from "next";
import {
  authTitleSx,
  formContainerControlSx,
  formContainerSx,
  formPageContainerSx,
} from "../../components/forms/styles";
import { FormPageBackground } from "../../components/forms/FormPageBackground";
import { FormTabs } from "../../components/forms/FormTabs";
import { SignInForm } from "../../components/forms/SignInForm";

const SignIn: NextPage = () => {
  return (
    <Center sx={formPageContainerSx}>
      <FormPageBackground />
      <Flex sx={formContainerSx}>
        <Title sx={authTitleSx}>Sign In</Title>
        <FormTabs />
        <Flex sx={formContainerControlSx}>
          <SignInForm />
          <Center mt={60} sx={{ fontSize: "2rem" }}>
            Oauth stuff goes here
          </Center>
        </Flex>
      </Flex>
    </Center>
  );
};

export default SignIn;
