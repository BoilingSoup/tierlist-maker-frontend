import { Box } from "@mantine/core";

type Props = {
  alpha: number;
};

export const BlackOverlay = ({ alpha }: Props) => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      backgroundColor: `rgba(0, 0, 0, ${alpha})`,
    }}
  />
);
