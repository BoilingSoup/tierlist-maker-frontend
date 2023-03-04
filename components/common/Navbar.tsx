import { Flex, Group, Text, Burger, MediaQuery, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LOGO_IMG } from "../../config/config";
import { LogoLink } from "./LogoLink";
import { MobileMenu } from "./MobileMenu";
import { displayNone, navbarHeight, navbarSx, navLinkTextSx } from "./styles";

export const Navbar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";

  return (
    <>
      <Flex sx={navbarSx} pl={10} pr={20}>
        <LogoLink
          text="tierlist.lol"
          src={LOGO_IMG}
          alt="logo image"
          href="/"
        />
        <Group>
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
      {opened && <MobileMenu />}
      <Box pt={navbarHeight} />
    </>
  );
};
