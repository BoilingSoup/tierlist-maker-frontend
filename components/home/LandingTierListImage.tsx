import { Box, Center, Flex, Text } from "@mantine/core";
import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
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

const colors: [string, string, string, string, string, string, string] = [
  "#fe7f7f",
  "#febe7e",
  "#fefe7f",
  "#7fff7f",
  "#7fbfff",
  "#7f7fff",
  "#fe7ffe",
];
const labels: Array<typeof colors> = [
  ["S", "A", "B", "C", "D", "E", "F"],
  ["Extraordinary", "Great", "OK", "Meh", "No thanks", "Absolutely Not", "Never"],
  ["Over 9000", "8999.99", "Above 0", "Zero", "Negative", "Negative Infinity", "Blackhole"],
  ["Supreme", "Superior", "Exceptional", "Above Average", "Average", "Below Average", "Mediocre"],
  ["Premium", "High Quality", "Good", "Fair", "Low Quality", "Poor", "Terrible"],
  ["Magic", "Decent", "So-So", "Weak", "Useless", "Nada", "EpicFail"],
];

export const LandingTierListImage = ({ overlayAlpha }: Props) => {
  const [tierListImage, setTierListImage] = useState<ReactNode>();

  useLayoutEffect(() => {
    const randLabels = labels[Math.floor(Math.random() * labels.length)];

    setTierListImage(
      colors.map((color, index) => {
        const isLast = index === colors.length - 1;
        return (
          <Flex key={color} sx={isLast ? landingImgLastRowContainerSx : landingImgRowContainerSx}>
            <Center sx={landingImgColorBoxSx} bg={color}>
              <Text>{randLabels[index]}</Text>
            </Center>
            <Box sx={isLast ? landingImgLastRowSx : landingImgRowSx} />
          </Flex>
        );
      })
    );
  }, []);

  return (
    <>
      <BlackOverlay alpha={overlayAlpha} />
      <Box sx={landingImgContainerSx}>{tierListImage}</Box>
    </>
  );
};
