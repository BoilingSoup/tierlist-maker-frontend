import { Title, Flex, TextInput, Group, Button, PasswordInput, Box } from "@mantine/core";
import { NextPage } from "next";
import { authFlexProps, authTitleProps, backdropBoxSx } from "../../components/auth/styles";
import { formFlexProps, formSubmitProps } from "../../components/forms/styles";
import useRegisterForm from "../../hooks/auth/useRegisterForm";

const Register: NextPage = () => {
  const form = useRegisterForm();

  return (
    <Flex
      {...authFlexProps}
    >
      <Box sx={backdropBoxSx} />
      <Box sx={backdropBoxSx} />
      <Box sx={backdropBoxSx} />
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        sx={{
          margin: "2rem",
          backgroundColor: "white",
          borderRadius: "12px",
          zIndex: 1
        }}
      >
        <Title {...authTitleProps}>
          Register
        </Title>
        <form onSubmit={form.onSubmit(console.log)}>
          <Box
            {...formFlexProps}
          >
            <TextInput
              withAsterisk
              label="E-mail"
              placeholder="your@email.com"
              type={"email"}
              {...form.getInputProps('email')}
            />
            <TextInput
              withAsterisk
              label="Username"
              placeholder="user.name"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="password"
              description="Password should be at least 3 characters long"
              {...form.getInputProps('password')}
            />

            <Group {...formSubmitProps}>
              <Button type="submit">Submit</Button>
            </Group>
          </Box>
        </form>
      </Flex>
    </Flex>
  );
};

export default Register;
