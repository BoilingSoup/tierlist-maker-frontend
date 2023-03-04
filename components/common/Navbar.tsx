import {
  Flex,
  Group,
  Text,
  Burger,
  MediaQuery,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LOGO_IMG } from "../../config/config";
import { useCloseHamburgerOnWindowResize } from "./hooks/useCloseMobileMenuIfLargeScreen";
import { LogoLink } from "./LogoLink";
import { MobileMenu } from "./MobileMenu";
import { displayNone, navbarHeight, navbarSx, navLinkTextSx } from "./styles";

export const Navbar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";
  const { breakpoints } = useMantineTheme();

  /**
   * Auto-close hamburger menu if window gets bigger than Mantine's sm breakpoint.
   */
  useCloseHamburgerOnWindowResize({
    opened,
    toggle,
    debounceMs: 20,
    breakpoint: breakpoints.sm,
  });

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

      {/**
       * Blank Box to offset all contents below Navbar because Navbar is position="fixed"
       * (Navbar stays at top while scrolling but is not part of regular document flow.)
       **/}
      <Box pt={navbarHeight} />
    </>
  );
};
