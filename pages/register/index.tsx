import { Title, Center, Flex } from "@mantine/core";
import { NextPage } from "next";
import {
  authTitleSx,
  formContainerSx,
  formPageContainerSx,
} from "../../components/auth/styles";
import { FormPageBackground } from "../../components/forms/FormPageBackground";
import { FormTabs } from "../../components/forms/FormTabs";
import { RegisterForm } from "../../components/forms/RegisterForm";

const fancyInputSx = { width: "80%", margin: "20px" };

const Register: NextPage = () => {
  return (
    <Center sx={formPageContainerSx}>
      <FormPageBackground />
      <Flex sx={formContainerSx}>
        <Title sx={authTitleSx}>Registration</Title>
        <FormTabs />
        <RegisterForm />
        <Center sx={{ height: "100%", fontSize: "2rem" }}>
          Oauth stuff goes here
        </Center>
      </Flex>
    </Center>
  );
};

export default Register;
