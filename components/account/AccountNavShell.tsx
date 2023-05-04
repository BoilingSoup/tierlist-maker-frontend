import { Box, Flex, NavLink, Tabs, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconActivity,
  IconPencil,
  IconSettings,
  IconUserPlus,
} from "@tabler/icons-react";
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

const MY_TIER_LISTS_LABEL_TEXT = "My Tier Lists";
const ACCOUNT_SETTINGS_LABEL_TEXT = "Account Settings";

export const AccountNavShell = ({ children }: Props) => {
  const router = useRouter();

  const theme = useMantineTheme();
  const largeScreen = useMediaQuery("(min-width: 62em)");

  return (
    <Flex sx={mainContainerSx} direction={largeScreen ? "row" : "column"}>
      {largeScreen ? (
        <Flex sx={accountSideNavSx}>
          <NavLink
            label={MY_TIER_LISTS_LABEL_TEXT}
            component={Link}
            href="/account/tierlists"
            sx={accountNavLinkSx}
            styles={accountNavLinkStyles}
            icon={<IconActivity size={iconSize} stroke={iconStroke} />}
            active={router.pathname === "/account/tierlists"}
          />
          <NavLink
            label={ACCOUNT_SETTINGS_LABEL_TEXT}
            component={Link}
            href="/account/settings"
            sx={accountNavLinkSx}
            styles={accountNavLinkStyles}
            icon={<IconSettings size={iconSize} stroke={iconStroke} />}
            active={router.pathname === "/account/settings"}
          />
        </Flex>
      ) : (
        <Tabs
          // mx="auto"
          value={router.pathname}
          onTabChange={(value) => router.push(`${value}`)}
          styles={{
            tab: {
              color: theme.colors.dark[3],
            },
          }}
        >
          <Tabs.List>
            <Tabs.Tab
              value={"/account/tierlists"}
              icon={<IconUserPlus size="0.8rem" />}
            >
              {MY_TIER_LISTS_LABEL_TEXT}
            </Tabs.Tab>
            <Tabs.Tab
              value={"/account/settings"}
              icon={<IconPencil size="0.8rem" />}
            >
              {ACCOUNT_SETTINGS_LABEL_TEXT}
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      )}
      <Box sx={mainContentContainerSx} w={largeScreen ? "80%" : "100%"}>
        {children}
      </Box>
    </Flex>
  );
};
