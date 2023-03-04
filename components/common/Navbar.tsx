import { Flex, Group, Image, Text, Burger, MediaQuery } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { LOGO_IMG } from "../../config/config";
import {
  displayNone,
  homeLinkStyle,
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
      <Link style={homeLinkStyle} href="/">
        <Flex sx={logoFlexSx}>
          <Image src={LOGO_IMG} alt="logo image" width={50} height={40} />
          <Text sx={logoTextSx} component="h1">
            tierlist.lol
          </Text>
        </Flex>
      </Link>
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
