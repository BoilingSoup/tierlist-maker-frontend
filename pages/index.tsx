import type { NextPage } from "next";
import { Box, Button, Center, CSSObject, MantineTheme, Text, useMantineTheme } from "@mantine/core";
import { LandingTierListImage } from "../components/home/LandingTierListImage";
import {
  landingSectionForegroundSx,
  landingSectionTextSx,
  landingTierListContainerSx,
} from "../components/common/styles";
import Link from "next/link";
import { RecentTierListCarousel } from "../components/home/RecentTierListCarousel";
import { useRecentTierList } from "../hooks/api/useRecentTierList";
import { useViewportSize } from "@mantine/hooks";
import { convertThemeBreakpointToPx } from "../components/common/helpers";
import { RecentTierListGrid } from "../components/home/RecentTierListGrid";
import { Footer } from "../components/common/Footer";
import { useShowAccountVerifiedNotification } from "../components/home/hooks/useShowAccountVerifiedNotification";
import { useGetInfinitePublicTierLists } from "../hooks/api/useGetInfinitePublicTierLists";
import { useGetInfiniteUserTierLists } from "../hooks/api/useGetInfiniteUserTierLists";

// Playground while I tinker with styles.
// Will move these objs after brainstorming phase.
const junk2 = ({ colors }: MantineTheme): CSSObject => ({
  // height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  width: "100%",
  // background: `radial-gradient(ellipse, ${fn.darken(colors.cyan[9], 0.9)}, ${fn.darken(colors.cyan[9], 1)})`,
  background: `radial-gradient(ellipse at top, rgb(30, 30, 30), ${colors.dark[9]})`,
  overflow: "hidden",
  // paddingBottom: "140px",
});

const tbd = (): CSSObject => ({
  fontSize: "2.5rem",
  color: "white",
  marginTop: "280px",
  marginBottom: "220px",
  textAlign: "center",
  // paddingTop: "20px",
});

const Home: NextPage = () => {
  const { width } = useViewportSize();
  const theme = useMantineTheme();
  const breakpoint = convertThemeBreakpointToPx(theme.breakpoints.md);

  const { data, isError, error, isLoading } = useRecentTierList();

  useShowAccountVerifiedNotification(theme);

  useGetInfinitePublicTierLists();
  useGetInfiniteUserTierLists();

  return (
    <>
      <Box sx={landingTierListContainerSx}>
        <LandingTierListImage overlayAlpha={0.5} />
      </Box>
      <Center sx={landingSectionForegroundSx}>
        <Text component="h2" sx={landingSectionTextSx}>
          A No BS Tier List Maker
          <br />
          Get started now!
        </Text>
        <Button component={Link} href="/create" color="cyan" size="lg">
          Create New Tier List
        </Button>
      </Center>
      <Box sx={junk2}>
        <Text component="h2" sx={tbd}>
          Recent Tier Lists
        </Text>
        {width < breakpoint && <RecentTierListCarousel data={data} isLoading={isLoading} />}
        {width >= breakpoint && (
          <RecentTierListGrid data={data} isError={isError} error={error} isLoading={isLoading} />
        )}
        <Footer />
      </Box>
    </>
  );
};

export default Home;
