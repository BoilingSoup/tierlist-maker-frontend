import { CSSObject, MantineTheme } from "@mantine/core";
import { THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from "../../config/config";

export const landingImgContainerSx = ({ colors, fn }: MantineTheme): CSSObject => ({
  position: "absolute",
  width: "90%",
  maxWidth: "1200px",
  transform: "rotate(330deg)",
  zIndex: -2,
  backgroundImage: `radial-gradient(ellipse, ${colors.dark[9]}, ${fn.lighten(colors.dark[8], 0.03)})`,
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

export const landingImgRowSx = ({ colors, fn }: MantineTheme): CSSObject => ({
  width: "100%",
  backgroundImage: `radial-gradient(ellipse, ${colors.dark[8]}, ${fn.lighten(colors.dark[7], 0.03)})`,
  maxHeight: landingImgColorBoxMaxSize,
});

export const landingImgLastRowSx = (theme: MantineTheme): CSSObject => ({
  ...landingImgRowSx(theme),
  borderBottomRightRadius: landingImgColorBoxBorderRadius,
});

export const CAROUSEL_SLIDE_SIZE = "80%";
export const CAROUSEL_THUMBNAIL_BORDER_RADIUS = 8; // px

export const recentTierListSkeletonSx = (): CSSObject => ({
  margin: "auto",
  width: CAROUSEL_SLIDE_SIZE,
  background: "rgba(50, 50, 50, 0.6)",
  aspectRatio: `${THUMBNAIL_WIDTH} / ${THUMBNAIL_HEIGHT}`,
  borderRadius: CAROUSEL_THUMBNAIL_BORDER_RADIUS,
});

export const carouselSx = (): CSSObject => ({
  margin: "0 auto",
});

export const carouselSlideSx = (): CSSObject => ({
  maxWidth: THUMBNAIL_WIDTH,
  margin: "auto 0",
});

export const carouselSlideStackSx = (): CSSObject => ({
  alignItems: "center",
  justifyContent: "center",
  color: "white",
});

export const carouselSlideWrapperSx = ({ colors, radius }: MantineTheme): CSSObject => ({
  background: colors.dark[5],
  borderRadius: radius.md,
  padding: "2rem",
  cursor: "pointer",
});

export const recentGridContainerSx: CSSObject = { maxWidth: "80%", color: "white" };

export const recentGridItemWrapperSx = ({ colors, radius }: MantineTheme): CSSObject => ({
  color: "white",
  textDecoration: "none",
  background: colors.dark[5],
  borderRadius: radius.md,
  padding: "2rem",
  transition: "transform 200ms ease",
  ":hover": { cursor: "pointer", transform: "scale(1.04)" },
});
