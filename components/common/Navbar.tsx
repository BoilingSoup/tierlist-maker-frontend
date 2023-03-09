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
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LOGO_IMG } from "../../config/config";
import { useCloseHamburgerOnWindowResize } from "./hooks/useCloseHamburgerOnWindowResize";
import { LogoLink } from "./LogoLink";
import { MobileMenu } from "./MobileMenu";
import { displayNone, NAVBAR_HEIGHT, navbarSx, navLinkTextSx, navLinkTextCurrentSx } from "./styles";

enum Route {
  Browse,
  Register,
  Login,
  None
}

export const Navbar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";
  const { breakpoints } = useMantineTheme();
  const { pathname } = useRouter();
  const [currentPath, setCurrentPath] = useState<Route>(Route.None);

  useEffect(() => {
    switch (pathname) {
      case "/browse": { setCurrentPath(Route.Browse); break; }
      case "/register": { setCurrentPath(Route.Register); break; }
      case "/signin": { setCurrentPath(Route.Login); break; }
      default: { setCurrentPath(Route.None); }
    }
  }, [pathname, currentPath]);


  /**
   * Auto-close hamburger menu if window gets bigger than Mantine's sm breakpoint.
   */
  useCloseHamburgerOnWindowResize({
    opened,
    toggle,
    breakpoint: breakpoints.sm,
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
              <Text
                sx={currentPath == Route.Browse ? navLinkTextCurrentSx : navLinkTextSx}
                component={Link}
                href="/browse"
              >
                Browse
              </Text>
              <Text
                sx={currentPath == Route.Register ? navLinkTextCurrentSx : navLinkTextSx}
                component={Link}
                href="/register"
              >
                Register
              </Text>
              <Text
                sx={currentPath == Route.Login ? navLinkTextCurrentSx : navLinkTextSx}
                component={Link}
                href="/signin"
              >
                Login
              </Text>
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
