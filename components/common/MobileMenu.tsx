import { Box, Center, Flex } from "@mantine/core";
import Link from "next/link";
import { useRouterEvent } from "./hooks/useRouterEvent";
import {
  getMobileNavLinkSx,
  mobileNavLinksContainerSx,
  mobileNavLinksOverlaySx,
} from "./styles";

type Props = {
  onLinkClick: () => void;
};

export const MobileMenu = ({ onLinkClick: closeMenu }: Props) => {
  useRouterEvent({ on: "routeChangeComplete", handler: closeMenu });

  return (
    <Box sx={mobileNavLinksOverlaySx}>
      <Flex sx={mobileNavLinksContainerSx}>
        <Center
          // sx={getMobileNavLinkSx(currentPath === Route.Home)}
          component={Link}
          href="/"
        >
          Home
        </Center>
        <Center
          // sx={getMobileNavLinkSx(currentPath === Route.Browse)}
          component={Link}
          href="/browse"
        >
          Browse
        </Center>
        <Center
          // sx={getMobileNavLinkSx(currentPath === Route.Create)}
          component={Link}
          href="/create"
        >
          Create New Tier List
        </Center>
        <Center
          // sx={getMobileNavLinkSx(currentPath === Route.Register)}
          component={Link}
          href="/register"
        >
          Register
        </Center>
        <Center
          // sx={getMobileNavLinkSx(currentPath === Route.SignIn)}
          component={Link}
          href="/signin"
        >
          Sign In
        </Center>
      </Flex>
    </Box>
  );
};
