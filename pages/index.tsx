import type { NextPage } from "next";
import {
  Box,
  Button,
  Center,
  CSSObject,
  MantineTheme,
  Text,
  useMantineTheme,
} from "@mantine/core";
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

// Playground while I tinker with styles.
// Will move these objs after brainstorming phase.
const junk2 = ({ colors }: MantineTheme): CSSObject => ({
  // height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  width: "100%",
  background: `radial-gradient(ellipse at top, ${colors.dark[6]}, ${colors.dark[8]})`,
  overflow: "hidden",
  // paddingBottom: "140px",
});

const tbd = (): CSSObject => ({
  fontSize: "clamp(1.5rem, 6vw, 2rem)",
  color: "white",
  margin: "80px",
  textAlign: "center",
  // paddingTop: "20px",
});

const Home: NextPage = () => {
  const { data, isError, error, isLoading } = useRecentTierList();

  const { width } = useViewportSize();
  const { breakpoints } = useMantineTheme();
  const breakpoint = convertThemeBreakpointToPx(breakpoints.md);

  return (
    <>
      <Box sx={landingTierListContainerSx}>
        <LandingTierListImage overlayAlpha={0.5} />
      </Box>
      <Center sx={landingSectionForegroundSx}>
        <Text component="h2" sx={landingSectionTextSx}>
          A no BS open-source tier list maker.
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
        {width < breakpoint && (
          <RecentTierListCarousel
            data={data}
            isError={isError}
            error={error}
            isLoading={isLoading}
          />
        )}
        {width >= breakpoint && (
          <RecentTierListGrid
            data={data}
            isError={isError}
            error={error}
            isLoading={isLoading}
          />
        )}
        <Footer />
      </Box>
    </>
  );
};

export default Home;
