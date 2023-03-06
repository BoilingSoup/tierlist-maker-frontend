import { Box, Flex } from "@mantine/core";
import Link from "next/link";
import { useRouterEvent } from "./hooks/useRouterEvent";
import { mobileNavLinksContainerSx, mobileNavLinksOverlaySx } from "./styles";
import styles from "./css-modules/MobileMenu.module.css";

type Props = {
  onLinkClick: () => void;
};

export const MobileMenu = ({ onLinkClick: closeMenu }: Props) => {
  useRouterEvent({ on: "routeChangeComplete", handler: closeMenu });

  const { link } = styles; // next/link styles from CSS modules. inline styles can't target pseudo selectors :hover :focus etc.

  /* TODO: highlight the currently active route with a different color/marker */
  // const router = useRouter();

  return (
    <Box sx={mobileNavLinksOverlaySx}>
      <Flex sx={mobileNavLinksContainerSx}>
        <Link className={link} href="/">
          Home
        </Link>
        <Link className={link} href="/browse">
          Browse
        </Link>
        <Link className={link} href="/create">
          Create New Tier List
        </Link>
        <Link className={link} href="/signin">
          Sign In
        </Link>
        <Link className={link} href="/register">
          Register
        </Link>
      </Flex>
    </Box>
  );
};
