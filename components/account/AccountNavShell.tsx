import { Box, Flex, NavLink } from "@mantine/core";
import { IconActivity, IconSettings } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { RemSize } from "../tierlist/types";
import {
  accountNavLinkStyles,
  accountNavLinkSx,
  accountSideNavSx,
  mainContainerSx,
  mainContentContainerSx,
} from "./styles";

const iconSize: RemSize = "1.2rem";
const iconStroke: number = 2;

type Props = {
  children: ReactNode;
};

export const AccountNavShell = ({ children }: Props) => {
  const { pathname } = useRouter();

  return (
    <Flex sx={mainContainerSx}>
      <Flex sx={accountSideNavSx}>
        <NavLink
          label="My Tier Lists"
          component={Link}
          href="/account/tierlists"
          sx={accountNavLinkSx}
          styles={accountNavLinkStyles}
          icon={<IconActivity size={iconSize} stroke={iconStroke} />}
          active={pathname === "/account/tierlists"}
        />
        <NavLink
          label="Account Settings"
          component={Link}
          href="/account/settings"
          sx={accountNavLinkSx}
          styles={accountNavLinkStyles}
          icon={<IconSettings size={iconSize} stroke={iconStroke} />}
          active={pathname === "/account/settings"}
        />
      </Flex>
      <Box sx={mainContentContainerSx}>{children}</Box>
    </Flex>
  );
};
