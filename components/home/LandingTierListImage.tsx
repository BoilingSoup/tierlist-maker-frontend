import { Box, CSSObject, Flex, Text } from "@mantine/core";
import { BlackOverlay } from "../common/BlackOverlay";

// box styles
const boxSize = "15vw";
const boxMinSize = "100px";
const boxMaxSize = "180px";
const boxBorderRadius = 6;
const colors = [
  "#fe7f7f",
  "#febe7e",
  "#fefe7f",
  "#7fff7f",
  "#7fbfff",
  "#7f7fff",
  "#fe7ffe",
];

// row styles
const rowPaddingVal = "10px";
const rowCss: CSSObject = {
  padding: `${rowPaddingVal} ${rowPaddingVal} 0 ${rowPaddingVal}`,
  width: "100%",
};

const darkGray = "rgba(100, 100, 100, 0.9)";

type Props = {
  overlayAlpha: number;
}

export const LandingTierListImage = ({overlayAlpha}: Props) => {
  return (
    <>
      <BlackOverlay alpha={overlayAlpha} />
      <Box
        pos="absolute"
        sx={{
          width: "90%",
          maxWidth: "1200px",
          transform: "rotate(330deg)",
          zIndex: -2,
          backgroundColor: darkGray,
        }}
      >
        {colors.map((color, index) => {
          const isLast = index === colors.length - 1;

          return (
            <Flex sx={isLast ? { ...rowCss, padding: rowPaddingVal } : rowCss}>
              <Box
                sx={{
                  width: boxSize,
                  height: boxSize,
                  minWidth: boxMinSize,
                  minHeight: boxMinSize,
                  maxWidth: boxMaxSize,
                  maxHeight: boxMaxSize,
                  borderRadius: boxBorderRadius,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                bg={color}
              >
                <Text>hi</Text>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  maxHeight: boxMaxSize,
                  borderBottomRightRadius: isLast ? boxBorderRadius : undefined,
                }}
                bg={darkGray}
              />
            </Flex>
          );
        })}
      </Box>
    </>
  );
};
