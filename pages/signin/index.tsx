import { Title, Center, Flex, Text } from "@mantine/core";
import { NextPage } from "next";
import {
  authTitleSx,
  formContainerSx,
  formPageContainerSx,
  oauthContainerSx,
} from "../../components/forms/styles";
import { FormPageBackground } from "../../components/forms/FormPageBackground";
import { FormTabs } from "../../components/forms/FormTabs";
import { SignInForm } from "../../components/forms/SignInForm";
import { OAuthIconsGroup } from "../../components/forms/OAuthIconsGroup";
import { useAuth } from "../../contexts/AuthProvider";
import { useRedirectIfAuthenticated } from "../../components/common/hooks/useRedirectIfAuthenticated";

const SignIn: NextPage = () => {
  const { user, isLoading } = useAuth();
  useRedirectIfAuthenticated({ user, isLoading, redirectTo: "/" });

  return (
    <Center sx={formPageContainerSx}>
      <FormPageBackground />
      <Flex sx={formContainerSx}>
        <Title sx={authTitleSx}>Sign In</Title>
        <FormTabs />
        <SignInForm />
        <Center sx={oauthContainerSx}>
          <Text size="md">Or sign in with</Text>
          <OAuthIconsGroup />
        </Center>
      </Flex>
    </Center>
  );
};

export default SignIn;
