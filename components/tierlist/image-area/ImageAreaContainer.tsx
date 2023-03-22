import { Box, Flex } from "@mantine/core";
import { ReactNode } from "react";
import { imageAreaContainerSx, imageAreaMaxBoundsSx } from "../styles";

type Props = {
  children: ReactNode;
};

export const ImageAreaContainer = ({ children }: Props) => {
  return (
    <Box sx={imageAreaMaxBoundsSx}>
      <Flex sx={imageAreaContainerSx}>{children}</Flex>
    </Box>
  );
};
