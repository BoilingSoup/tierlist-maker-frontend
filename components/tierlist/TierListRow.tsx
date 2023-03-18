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
        }}
      >
        {label}
      </Center>
    </Flex>
  );
};
