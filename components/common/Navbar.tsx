import { Flex, Group, Text } from "@mantine/core";
import { navbarSx, navTextSx } from "./styles";

export const Navbar = () => {
  return (
    <Flex sx={navbarSx} pl={25}>
      <Text sx={navTextSx}>Tierlist.lol</Text>
      <Group pr={25}>
        <Text sx={navTextSx}>Browse</Text>
        <Text sx={navTextSx}>Register</Text>
        <Text sx={navTextSx}>Login</Text>
      </Group>
    </Flex>
  );
};
