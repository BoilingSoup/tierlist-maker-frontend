import { Box, Center } from "@mantine/core";
import Link from "next/link";
import { desktopNavLinkBoxSx, getNavLinkTextSx } from "./styles";

type Props = {
  href: string;
  isCurrentPath: boolean;
  text: string;
};

export const DesktopNavLink = ({ href, isCurrentPath, text }: Props) => {
  return (
    <Box sx={desktopNavLinkBoxSx}>
      <Center sx={getNavLinkTextSx(isCurrentPath)} component={Link} href={href}>
        {text}
      </Center>
    </Box>
  );
};
