import { Center, Flex } from "@mantine/core";
import { ReactNode } from "react";
import { imagesFlexContainerSx, scrollContainerSx } from "../styles";

type Props = {
  children: ReactNode;
  setNodeRef: (element: HTMLElement | null) => void;
};
export const ImageAreaScrollContainer = ({ children, setNodeRef }: Props) => {
  return (
    <Center sx={scrollContainerSx} ref={setNodeRef}>
      <Flex sx={imagesFlexContainerSx}>{children}</Flex>
    </Center>
  );
};
