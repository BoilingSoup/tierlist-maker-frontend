import { CSSObject } from "@mantine/core";

const landingImgBg = "rgba(100, 100, 100, 0.9)";

export const landingImgContainerSx = (): CSSObject => ({
  position: "absolute",
  width: "90%",
  maxWidth: "1200px",
  transform: "rotate(330deg)",
  zIndex: -2,
  backgroundColor: landingImgBg,
});

const landingImgRowPadding = "10px";

export const landingImgRowContainerSx = (): CSSObject => ({
  padding: `${landingImgRowPadding} ${landingImgRowPadding} 0 ${landingImgRowPadding}`, // top, left, right padding. 0 padding-bottom
  width: "100%",
});

export const landingImgLastRowContainerSx = (): CSSObject => ({
  ...landingImgRowContainerSx(),
  padding: `${landingImgRowPadding}`, // all sides get padding
});

const landingImgColorBoxSize = "15vw";
const landingImgColorBoxMinSize = "100px";
const landingImgColorBoxMaxSize = "180px";
const landingImgColorBoxBorderRadius = 6;

export const landingImgColorBoxSx = (): CSSObject => ({
  width: landingImgColorBoxSize,
  height: landingImgColorBoxSize,
  minWidth: landingImgColorBoxMinSize,
  minHeight: landingImgColorBoxMinSize,
  maxWidth: landingImgColorBoxMaxSize,
  maxHeight: landingImgColorBoxMaxSize,
  borderRadius: landingImgColorBoxBorderRadius,
});

export const landingImgRowSx = (): CSSObject => ({
  width: "100%",
  backgroundColor: landingImgBg,
  maxHeight: landingImgColorBoxMaxSize,
});

export const landingImgLastRowSx = (): CSSObject => ({
  ...landingImgRowSx(),
  borderBottomRightRadius: landingImgColorBoxBorderRadius,
});
