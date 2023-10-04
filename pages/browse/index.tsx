import { Box } from "@mantine/core";
import type { NextPage } from "next";
import { NAVBAR_HEIGHT } from "../../components/common/styles";

const Browse: NextPage = () => {
  return (
    <Box
      sx={(theme) => ({
        background: theme.colors.dark[7],
        borderTop: `1px solid ${theme.colors.dark[3]}`,
        height: `calc(100vh - ${NAVBAR_HEIGHT})`,
        color: "white",
      })}
    >
      Browse page...
    </Box>
  );
};

export default Browse;
