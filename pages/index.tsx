import type { NextPage } from "next";
import { Box, Button, Center, CSSObject, Text } from "@mantine/core";
import { LandingTierListImage } from "../components/home/LandingTierListImage";
import {
  landingSectionForegroundSx,
  landingSectionTextSx,
  landingTierListContainerSx,
  NAVBAR_HEIGHT,
} from "../components/common/styles";
import Link from "next/link";
import { RecentTierListCarousel } from "../components/home/RecentTierListCarousel";

// Playground while I tinker with styles.
// Will move these objs after brainstorming phase.
const junk2: CSSObject = {
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  backgroundColor: "rgba(0, 0, 0, 0.9)",
};

const tbd = (): CSSObject => ({
  fontSize: "2rem",
  color: "white",
  margin: 0,
  textAlign: "center",
  paddingTop: "20px",
});

const Home: NextPage = () => {
  const placeHolderText = (
    <>
      <Text size={"4rem"}>Creating tier lists doesn't need to suck.</Text>
    </>
  );

  return (
    <>
      <Box bg="black" sx={landingTierListContainerSx}>
        <LandingTierListImage overlayAlpha={0.6} />
      </Box>
      <Center sx={landingSectionForegroundSx}>
        <Text component="h2" sx={landingSectionTextSx}>
          {placeHolderText}
        </Text>
        <Button component={Link} href="/create" color="cyan" size="lg">
          Create New Tier List
        </Button>
      </Center>
      <Box sx={junk2}>
        <Text component="h2" sx={tbd}>
          Recent Tier Lists
        </Text>
        <RecentTierListCarousel />
      </Box>
    </>
  );
};

export default Home;
