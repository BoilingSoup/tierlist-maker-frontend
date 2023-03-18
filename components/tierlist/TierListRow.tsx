import { Flex } from "@mantine/core";
import { TierListRowProps } from "./types";

export const TierListRow = ({
  label,
  color,
  height,
  items,
}: TierListRowProps) => {
  return (
    <Flex>
      <Flex
        sx={{
          // height: "clamp(80px, 10vw, 140px)",
          height: `clamp(10vw, ${height}, 140px)`,
          width: `clamp(10vw, ${height}, 140px)`,
          // width: "clamp(80px, 10vw, 140px)",
          backgroundColor: color,
        }}
      >
        {label}
      </Flex>
    </Flex>
  );
};
