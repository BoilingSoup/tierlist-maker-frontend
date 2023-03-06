import { Title, Flex, TextInput, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextPage } from "next";
import { NAVBAR_HEIGHT } from "../../components/common/styles";

const SignIn: NextPage = () => {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (value !== '' ? null : 'Username is empty'),
      password: (value) => (value.length > 2 ? null : 'Password is too short'),
    }
  });
  
  return (
    <Flex
      direction="column"
      justify={"flex-start"}
      align={"center"}
      rowGap="xl"
      sx={{
        backgroundColor: "black",
        color: "white",
        height: `calc(100vh - ${NAVBAR_HEIGHT})`,
        ["& .mantine-TextInput-label"] : { color: "white" }
      }}
    >
      <Title size={50} mt="xl">
        Sign In
      </Title>
      <form onSubmit={form.onSubmit(console.log)}>
        <Flex
          direction={"column"}
          maw={300}
          mx="auto"
          mt="5rem"
          gap={"lg"}
        >
          <TextInput
            withAsterisk
            label="Username"
            placeholder="user.name"
            {...form.getInputProps('username')}
          />
          <TextInput
            withAsterisk
            label="Password"
            placeholder="password"
            type={"password"}
            {...form.getInputProps('password')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </Flex>
        </form>
    </Flex>
  );
};
export default SignIn;
