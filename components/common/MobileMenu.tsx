import { Box, Center, Flex } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const currentRoute = router.route;

  useRouterEvent({ on: "routeChangeComplete", handler: closeMenu });

  return (
    <Box sx={mobileNavLinksOverlaySx}>
      <Flex sx={mobileNavLinksContainerSx}>
        <Center
          sx={getMobileNavLinkSx(currentRoute === "/")}
          component={Link}
          href="/"
        >
          Home
        </Center>
        <Center
          sx={getMobileNavLinkSx(currentRoute === "/browse")}
          component={Link}
          href="/browse"
        >
          Browse
        </Center>
        <Center
          sx={getMobileNavLinkSx(currentRoute === "/create")}
          component={Link}
          href="/create"
        >
          Create New Tier List
        </Center>
        <Center
          sx={getMobileNavLinkSx(currentRoute === "/register")}
          component={Link}
          href="/register"
        >
          Register
        </Center>
        <Center
          sx={getMobileNavLinkSx(currentRoute === "/signin")}
          component={Link}
          href="/signin"
        >
          Sign In
        </Center>
      </Flex>
    </Box>
  );
};
