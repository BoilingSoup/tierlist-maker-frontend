import {
  Flex,
  Group,
  Burger,
  MediaQuery,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LOGO_IMG } from "../../config/config";
import { DesktopNavLink } from "./DesktopNavLink";
import { convertThemeBreakpointToPx } from "./helpers";
import { useCloseHamburgerOnWindowResize } from "./hooks/useCloseHamburgerOnWindowResize";
import { useCurrentPath } from "./hooks/useCurrentPath";
import { LogoLink } from "./LogoLink";
import { MobileMenu } from "./MobileMenu";
import { displayNone, NAVBAR_HEIGHT, navbarSx } from "./styles";
import { Route } from "./types";

export const Navbar = () => {
  const { breakpoints } = useMantineTheme();
  const currentPath = useCurrentPath();

  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";

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
              <DesktopNavLink
                href="/browse"
                text="Browse"
                isCurrentPath={currentPath === Route.Browse}
              />
              <DesktopNavLink
                href="/register"
                text="Register"
                isCurrentPath={currentPath === Route.Register}
              />
              <DesktopNavLink
                href="/signin"
                text="Sign In"
                isCurrentPath={currentPath === Route.SignIn}
              />
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
