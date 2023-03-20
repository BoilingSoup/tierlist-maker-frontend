import { Center, Flex } from "@mantine/core";
import { TierListRowProps } from "./types";

export const TierListRow = ({
  label,
  color,
  height,
  items,
}: TierListRowProps) => {
  return (
    <Flex>
      <Center
        sx={{
          // height: `clamp(10vw, ${height}, 140px)`,
          // width: `clamp(10vw, ${height}, 140px)`,
          height,
          width: height,
          backgroundColor: color,
          color: "black",
          fontSize: "clamp(2rem, 6vw, 3rem)",
          border: "2px solid black",
        }}
      >
        {label}
      </Center>
      <Flex
        sx={(theme) => ({
          width: "100%",
          backgroundImage: `radial-gradient(ellipse, ${
            theme.colors.dark[9]
          }, ${theme.fn.lighten(theme.colors.dark[8], 0.03)})`,
          border: "2px solid black",
        })}
      ></Flex>
    </Flex>
  );
};
