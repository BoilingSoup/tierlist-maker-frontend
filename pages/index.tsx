import { Navbar } from "../components/common/Navbar";
import type { NextPage } from "next";
import { Box, Button, Flex, Text } from "@mantine/core";
import { LandingTierListImage } from "../components/home/LandingTierListImage";
import { landingTierListContainerSx } from "../components/common/styles";

const junk = {
  height: "80vh",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
};

const junk2 = {
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
};

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Box bg="black" sx={landingTierListContainerSx}>
        {/* TODO: tweak placement with media queries, tweak colors */}
        <LandingTierListImage />
      </Box>
      <Flex sx={junk}>
        <Button color="cyan" size="lg">
          Placeholder
        </Button>
      </Flex>
      <Box sx={junk2}>
        <Text
          component="h2"
          sx={{ fontSize: "2rem", color: "white" }}
          m={0}
          align="center"
          pt={20}
        >
          Recent Tierlists
        </Text>
      </Box>
    </>
  );
};

export default Home;
