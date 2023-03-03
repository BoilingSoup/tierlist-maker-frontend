import { Flex, Group, Text, Burger, MediaQuery } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { logoImg } from "../../config/config";
import {
  displayNone,
  logoFlexSx,
  logoTextSx,
  navbarSx,
  navLinkTextSx,
} from "./styles";

const navPadding = 25;

export const Navbar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";

  return (
    <Flex sx={navbarSx} pl={navPadding}>
      <Flex sx={logoFlexSx}>
        <img src={logoImg} width="50" height="40" />
        <Text sx={logoTextSx} component="h1">
          Tierlist.lol
        </Text>
      </Flex>
      <Group pr={navPadding}>
        <MediaQuery styles={displayNone} largerThan="sm">
          <Burger
            color="white"
            opened={opened}
            onClick={toggle}
            aria-label={label}
          />
        </MediaQuery>
        <MediaQuery styles={displayNone} smallerThan="sm">
          <Group>
            <Text sx={navLinkTextSx}>Browse</Text>
            <Text sx={navLinkTextSx}>Register</Text>
            <Text sx={navLinkTextSx}>Login</Text>
          </Group>
        </MediaQuery>
      </Group>
    </Flex>
  );
};
