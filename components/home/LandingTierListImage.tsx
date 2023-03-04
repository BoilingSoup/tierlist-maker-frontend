import { Box, Center, Flex, Text } from "@mantine/core";
import { BlackOverlay } from "../common/BlackOverlay";
import {
  landingImgColorBoxSx,
  landingImgContainerSx,
  landingImgLastRowContainerSx,
  landingImgLastRowSx,
  landingImgRowContainerSx,
  landingImgRowSx,
} from "./styles";

type Props = {
  overlayAlpha: number;
};

const colors = [
  "#fe7f7f",
  "#febe7e",
  "#fefe7f",
  "#7fff7f",
  "#7fbfff",
  "#7f7fff",
  "#fe7ffe",
];

export const LandingTierListImage = ({ overlayAlpha }: Props) => {
  return (
    <>
      <BlackOverlay alpha={overlayAlpha} />
      <Box sx={landingImgContainerSx}>
        {colors.map((color, index) => {
          const isLast = index === colors.length - 1;

          return (
            <Flex
              key={color}
              sx={
                isLast ? landingImgLastRowContainerSx : landingImgRowContainerSx
              }
            >
              <Center sx={landingImgColorBoxSx} bg={color}>
                <Text>hi</Text>
              </Center>
              <Box sx={isLast ? landingImgLastRowSx : landingImgRowSx} />
            </Flex>
          );
        })}
      </Box>
    </>
  );
};
