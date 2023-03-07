import { Title, Flex, TextInput, Group, Button, PasswordInput, Box } from "@mantine/core";
import { NextPage } from "next";
import { authFlexProps, authTitleProps, backdropBoxSx } from "../../components/auth/styles";
import { formFlexProps, formSubmitProps } from "../../components/forms/styles";
import useSignInForm from "../../hooks/auth/useSignInForm";

const SignIn: NextPage = () => {
  const form = useSignInForm();

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
        }}
      >
        <Title {...authTitleProps}>
          Sign In
        </Title>
        <form onSubmit={form.onSubmit(console.log)}>
          <Flex
            {...formFlexProps}
          >
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
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
export default SignIn;
