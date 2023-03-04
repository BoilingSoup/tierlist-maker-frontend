import { Box } from "@mantine/core";
import { navbarHeight } from "./styles";

export const MobileMenu = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 100,
        color: "white",
        backgroundColor: "black",
        width: "100%",
        marginTop: navbarHeight,
        height: `calc(100% - ${navbarHeight})`,
      }}
    >
      Mobile Menu
    </Box>
  );
};
