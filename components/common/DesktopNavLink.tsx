import { Box, Center, Loader } from "@mantine/core";
import Link from "next/link";
import { ReactElement } from "react";
import { desktopNavLinkBoxSx, getNavLinkTextSx, signOutButtonSx } from "./styles";

type PageLink = {
  href: string;
  isCurrentPath: boolean;
  text: string;
  isLoading?: boolean;
  onClick?: undefined;
};

type SignOutButton = {
  href?: undefined;
  isCurrentPath?: undefined;
  text: string;
  isLoading: boolean;
  onClick: () => void;
};

type Props = PageLink | SignOutButton;

export const DesktopNavLink = ({ href, isCurrentPath, text, isLoading, onClick: clickHandler }: Props) => {
  let element: ReactElement;

  if (href !== undefined) {
    element = (
      <Box sx={desktopNavLinkBoxSx}>
        <Center sx={getNavLinkTextSx(isCurrentPath)} component={Link} href={href}>
          {isLoading ? <Loader size="sm" color="cyan" /> : text}
        </Center>
      </Box>
    );
  } else {
    element = (
      <Box sx={desktopNavLinkBoxSx}>
        <Center sx={signOutButtonSx} component={"button"} onClick={clickHandler}>
          {isLoading ? <Loader size="sm" color="cyan" /> : text}
        </Center>
      </Box>
    );
  }

  return element;
};
