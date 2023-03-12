import { Box, Center, Flex } from "@mantine/core";
import Link from "next/link";
import { useRouterEvent } from "./hooks/useRouterEvent";
import {
  mobileNavLinksContainerSx,
  mobileNavLinksOverlaySx,
  mobileNavLinkSx,
} from "./styles";

type Props = {
  onLinkClick: () => void;
};

export const MobileMenu = ({ onLinkClick: closeMenu }: Props) => {
  useRouterEvent({ on: "routeChangeComplete", handler: closeMenu });

  /* TODO: highlight the currently active route with a different color/marker */
  // const router = useRouter();

  return (
    <Box sx={mobileNavLinksOverlaySx}>
      <Flex sx={mobileNavLinksContainerSx}>
        <Center sx={mobileNavLinkSx} component={Link} href="/">
          Home
        </Center>
        <Center sx={mobileNavLinkSx} component={Link} href="/browse">
          Browse
        </Center>
        <Center sx={mobileNavLinkSx} component={Link} href="/create">
          Create New Tier List
        </Center>
        <Center sx={mobileNavLinkSx} component={Link} href="/signin">
          Sign In
        </Center>
        <Center sx={mobileNavLinkSx} component={Link} href="/register">
          Register
        </Center>
      </Flex>
    </Box>
  );
};
