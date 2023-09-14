import { Box, Center, Flex, Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthProvider";
import { useSignOutMutation } from "../../hooks/api/useSignOutMutation";
import { useRouterEvent } from "./hooks/useRouterEvent";
import {
  getMobileNavLinkSx,
  mobileNavLinksContainerSx,
  mobileNavLinksOverlaySx,
  mobileNavLinkSx,
  mobileSignOutButtonSx,
} from "./styles";

type Props = {
  onLinkClick: () => void;
};

export const MobileMenu = ({ onLinkClick: closeMenu }: Props) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const currentRoute = router.route;
  const isAuthenticated = !isLoading && !!user;
  const isUnauthenticated = !isLoading && !user;

  const { mutate: signOut, isLoading: isSigningOut } = useSignOutMutation();

  useRouterEvent({ on: "routeChangeComplete", handler: closeMenu });

  return (
    <Box sx={mobileNavLinksOverlaySx}>
      <Flex sx={mobileNavLinksContainerSx}>
        <Center sx={getMobileNavLinkSx(currentRoute === "/")} component={Link} href="/">
          Home
        </Center>
        <Center sx={getMobileNavLinkSx(currentRoute === "/browse")} component={Link} href="/browse">
          Browse
        </Center>
        <Center sx={getMobileNavLinkSx(currentRoute === "/create")} component={Link} href="/create">
          Create New Tier List
        </Center>
        {isLoading && (
          <>
            <Center sx={mobileNavLinkSx}>
              <Loader color="cyan" size="sm" />
            </Center>
            <Center sx={mobileNavLinkSx}>
              <Loader color="cyan" size="sm" />
            </Center>
          </>
        )}
        {isAuthenticated && (
          <>
            <Center
              sx={getMobileNavLinkSx(currentRoute === "/account/tierlists" || currentRoute === "/account/settings")}
              component={Link}
              href="/account/tierlists"
            >
              Account
            </Center>
            <Center sx={mobileSignOutButtonSx} component="button" onClick={() => signOut()}>
              {isSigningOut ? <Loader color="cyan" size="sm" /> : "Sign Out"}
            </Center>
          </>
        )}
        {isUnauthenticated && (
          <>
            <Center sx={getMobileNavLinkSx(currentRoute === "/register")} component={Link} href="/register">
              Register
            </Center>
            <Center sx={getMobileNavLinkSx(currentRoute === "/signin")} component={Link} href="/signin">
              Sign In
            </Center>
          </>
        )}
      </Flex>
    </Box>
  );
};
