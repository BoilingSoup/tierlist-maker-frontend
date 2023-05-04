import {
  Box,
  Divider,
  Flex,
  MediaQuery,
  NavLink,
  Tabs,
  useMantineTheme,
} from "@mantine/core";
import {
  IconActivity,
  IconPencil,
  IconSettings,
  IconUserPlus,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { displayNone } from "../common/styles";
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
const MY_TIER_LISTS_LABEL_TEXT = "My Tier Lists";
const ACCOUNT_SETTINGS_LABEL_TEXT = "Account Settings";

type Props = {
  children: ReactNode;
};

export const AccountNavShell = ({ children }: Props) => {
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <Flex sx={mainContainerSx}>
      <MediaQuery styles={displayNone} smallerThan="md">
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
      </MediaQuery>
      <MediaQuery styles={displayNone} largerThan="md">
        <Box mx="auto" mt="xl">
          <Tabs
            variant="outline"
            value={router.pathname}
            onTabChange={(value) => router.push(`${value}`)}
            styles={{
              tabsList: {
                border: "none",
              },
              tab: {
                color: theme.colors.dark[0],
                "&[data-active]": {
                  color: theme.colors.cyan[2],
                  border: `1px solid ${theme.colors.cyan[2]}`,
                  borderBottom: "none",
                  "::before": {
                    background: "none",
                  },
                },
                ":hover": {
                  background: "none",
                },
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
          <Divider color="dark.3" />
        </Box>
      </MediaQuery>
      <Box sx={mainContentContainerSx}>{children}</Box>
    </Flex>
  );
};
