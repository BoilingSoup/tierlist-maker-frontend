import {
  Box,
  Center,
  CSSObject,
  Flex,
  MantineTheme,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { useRouterEvent } from "./hooks/useRouterEvent";
import { navbarHeight } from "./styles";

const linkContainerCss = ({ colors }: MantineTheme): CSSObject => ({
  color: "white",
  height: "70px",
  backgroundColor: "black",
  "&:hover": {
    backgroundColor: colors.cyan[8],
  },
});

const linkCss = {
  width: "100%",
  textDecoration: "none",
};

type Props = {
  onLinkClick: () => void;
};

export const MobileMenu = ({ onLinkClick: closeMenu }: Props) => {
  useRouterEvent({ on: "routeChangeComplete", handler: closeMenu });

  /* TODO: highlight the currently active route with a different color/marker */
  // const router = useRouter();

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1,
        color: "white",
        backgroundColor: "black",
        width: "100%",
        marginTop: navbarHeight,
        height: `calc(100vh - ${navbarHeight})`,
        alignItems: "center",
      }}
    >
      <Flex sx={{ flexDirection: "column" }}>
        <Link style={linkCss} href="/">
          <Center sx={linkContainerCss}>
            <Text size="xl">Home</Text>
          </Center>
        </Link>
        <Link style={linkCss} href="/browse">
          <Center sx={linkContainerCss}>
            <Text size="xl">Browse</Text>
          </Center>
        </Link>
        <Link style={linkCss} href="/create">
          <Center sx={linkContainerCss}>
            <Text size="xl">Create New Tier List</Text>
          </Center>
        </Link>
        <Link style={linkCss} href="/signin">
          <Center sx={linkContainerCss}>
            <Text size="xl">Sign In</Text>
          </Center>
        </Link>
        <Link style={linkCss} href="/register">
          <Center sx={linkContainerCss}>
            <Text size="xl">Register</Text>
          </Center>
        </Link>
      </Flex>
    </Box>
  );
};
