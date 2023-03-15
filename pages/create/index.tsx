import { Box, Flex } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { NAVBAR_HEIGHT } from "../../components/common/styles";

const Create: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Tier List</title>
      </Head>
      <Flex sx={{ width: "100%", height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
        <Box sx={{ width: "80%", backgroundColor: "gray", color: "white" }}>
          Main View ...
        </Box>
        <Box sx={{ width: "20%", backgroundColor: "navy", color: "white" }}>
          Toolbar ...
        </Box>
      </Flex>
    </>
  );
};

export default Create;
