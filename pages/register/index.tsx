import { Title, Box, Center, Flex } from "@mantine/core";
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
      <Box top={200} right={-300} sx={backdropBoxSx} />
      <Box bottom={-300} left={200} sx={backdropBoxSx} />
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
