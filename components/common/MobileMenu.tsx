import {
  Box,
  Center,
  CSSObject,
  Flex,
  MantineTheme,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { navbarHeight } from "./styles";

const linkCss = ({ colors }: MantineTheme): CSSObject => ({
  color: "white",
  height: "70px",
  backgroundColor: "black",
  "&:hover": {
    backgroundColor: colors.cyan[8],
  },
});

export const MobileMenu = () => {
  {
    /* TODO: highlight the currently active route with a different color/marker */
  }
  const router = useRouter();

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
        <Link style={{ width: "100%", textDecoration: "none" }} href="/">
          <Center sx={linkCss}>
            <Text size="xl">Home</Text>
          </Center>
        </Link>
        <Link style={{ width: "100%", textDecoration: "none" }} href="/browse">
          <Center sx={linkCss}>
            <Text size="xl">Browse</Text>
          </Center>
        </Link>
        <Link style={{ width: "100%", textDecoration: "none" }} href="/create">
          <Center sx={linkCss}>
            <Text size="xl">Create Tier List</Text>
          </Center>
        </Link>
        <Center sx={linkCss}>
          <Text size="xl">Sign In</Text>
        </Center>
        <Center sx={linkCss}>
          <Text size="xl">Register</Text>
        </Center>
      </Flex>
    </Box>
  );
};
