import { Center, Flex } from "@mantine/core";
import { ReactNode } from "react";
import { imagesFlexContainerSx, scrollContainerSx } from "../styles";

type Props = {
  children: ReactNode;
};
export const ImageAreaScrollContainer = ({ children }: Props) => {
  return (
    <Center sx={scrollContainerSx}>
      <Flex sx={imagesFlexContainerSx}>{children}</Flex>
    </Center>
  );
};
