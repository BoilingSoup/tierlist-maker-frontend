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
import { DesktopNavLinksGroup } from "./DesktopNavLinksGroup";
import { convertThemeBreakpointToPx } from "./helpers";
import { useCloseHamburgerOnWindowResize } from "./hooks/useCloseHamburgerOnWindowResize";
import { useCurrentPath } from "./hooks/useCurrentPath";
import { LogoLink } from "./LogoLink";
import { MobileMenu } from "./MobileMenu";
import { displayNone, NAVBAR_HEIGHT, navbarSx } from "./styles";

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
    // Mantine theme breakpoints are em units; convert to px for handling resize events
    breakpoint: convertThemeBreakpointToPx(breakpoints.sm),
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
            <DesktopNavLinksGroup currentPath={currentPath} />
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
