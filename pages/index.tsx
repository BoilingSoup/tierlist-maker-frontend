import { Navbar } from "../components/common/Navbar";
import type { NextPage } from "next";
import { Box, Button, Flex, Text } from "@mantine/core";

const junk = {
  height: "80vh",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "gray",
};

const junk2 = {
  height: "100vh",
  backgroundColor: "rgba(10, 10, 10, 0.8)",
};

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
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
