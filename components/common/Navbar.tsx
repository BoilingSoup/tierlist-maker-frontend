import {
  Flex,
  Group,
  Text,
  Burger,
  MediaQuery,
  Box,
  useMantineTheme,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { LOGO_IMG } from "../../config/config";
import { convertThemeBreakpointToPx } from "./helpers";
import { useCloseHamburgerOnWindowResize } from "./hooks/useCloseHamburgerOnWindowResize";
import { useCurrentPath } from "./hooks/useCurrentPath";
import { LogoLink } from "./LogoLink";
import { MobileMenu } from "./MobileMenu";
import {
  displayNone,
  NAVBAR_HEIGHT,
  navbarSx,
  getNavLinkTextSx,
} from "./styles";
import { Route } from "./types";

export const Navbar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";
  const { breakpoints } = useMantineTheme();
  const currentPath = useCurrentPath();

  /**
   * Auto-close hamburger menu if window gets bigger than Mantine's sm breakpoint.
   */
  useCloseHamburgerOnWindowResize({
    opened,
    toggle,
    breakpoint: convertThemeBreakpointToPx(breakpoints),
  });

  const closeMobileMenuHandler = () => {
    if (opened) toggle();
  };

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
              <Center sx={{ width: "80px" }}>
                <Text
                  sx={getNavLinkTextSx(currentPath == Route.Browse)}
                  component={Link}
                  href="/browse"
                >
                  Browse
                </Text>
              </Center>
              <Center sx={{ width: "80px" }}>
                <Text
                  sx={getNavLinkTextSx(currentPath == Route.Register)}
                  component={Link}
                  href="/register"
                >
                  Register
                </Text>
              </Center>
              <Center sx={{ width: "80px" }}>
                <Text
                  sx={getNavLinkTextSx(currentPath == Route.Login)}
                  component={Link}
                  href="/signin"
                >
                  Login
                </Text>
              </Center>
            </Group>
          </MediaQuery>
        </Group>
      </Flex>
      {opened && <MobileMenu onLinkClick={closeMobileMenuHandler} />}

      {/**
       * Blank Box to offset all contents below Navbar because Navbar is position="fixed"
       * (Navbar stays at top while scrolling but is not part of regular document flow.)
       **/}
      <Box pt={NAVBAR_HEIGHT} />
    </>
  );
};
