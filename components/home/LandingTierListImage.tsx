import { Box, Flex, Text } from "@mantine/core";

const darkGray = "rgba(3, 3, 3, 0.9)";

const boxSize = "15vw";
const boxMinSize = "75px";
const boxMaxSize = "150px";

const rowPaddingVal = "10px";
const rowCss = {
  padding: `${rowPaddingVal} ${rowPaddingVal} 0 ${rowPaddingVal}`,
  width: "100%",
};

const boxBorderRadius = 6;

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

export const LandingTierListImage = () => {
  return (
    <Box
      pos="absolute"
      sx={{
        width: "80%",
        maxWidth: "1200px",
        top: 30,
        right: 0,
        left: 50,
        margin: "auto",
        transform: "rotate(330deg)",
        zIndex: -1,
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
                minWidth: `calc(${boxMinSize} * 4)`,
                minHeight: boxMinSize,
                maxHeight: boxMaxSize,
                borderBottomRightRadius: isLast ? boxBorderRadius : undefined,
              }}
              bg={darkGray}
            />
          </Flex>
        );
      })}
    </Box>
  );
};
