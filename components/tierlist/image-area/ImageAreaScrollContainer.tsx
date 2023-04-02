import { Center, Flex } from "@mantine/core";
import { ReactNode } from "react";
import { imagesFlexContainerSx, scrollContainerSx } from "../styles";

type Props = {
  children: ReactNode;
  setNodeRef: (element: HTMLElement | null) => void
};
export const ImageAreaScrollContainer = ({ children, setNodeRef }: Props) => {
  return (
    <Center sx={scrollContainerSx} ref={setNodeRef}>
      <Flex
        sx={imagesFlexContainerSx}
        contentEditable="true" // Enables right-click paste in a non-input element.
        suppressContentEditableWarning={true} // State changes are handled properly. Paste/KeyDown events are prevented and usePasteEvent takes over.
        onPaste={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (!e.ctrlKey) e.preventDefault();
        }}
      >
        {children}
      </Flex>
    </Center>
  );
};
