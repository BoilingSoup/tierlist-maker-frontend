import { CSSObject, ListStylesNames, MantineTheme, Styles } from "@mantine/core";
import { PxSize } from "./types";

export const MOBILE_BOTTOM_BAR: PxSize = "250px";

export const sidebarContainerSx = ({ colors, breakpoints }: MantineTheme): CSSObject => ({
  width: "25%",
  backgroundColor: colors.dark[8],
  color: "white",
  flexDirection: "column",
  [`@media (max-width:${breakpoints.lg})`]: {
    width: "100%",
    height: MOBILE_BOTTOM_BAR,
    flexDirection: "column-reverse",
  },
});

export const imageAreaMaxBoundsSx = ({ breakpoints }: MantineTheme): CSSObject => ({
  height: "85%",
  width: "100%",
  flexDirection: "column",
  position: "relative",
  [`@media (max-width:${breakpoints.lg})`]: {
    // width: "80%",
    // height: "100%",
  },
});

export const imageAreaContainerSx = ({ colors, breakpoints }: MantineTheme): CSSObject => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "94%",
  width: "92%",
  border: `2px solid ${colors.dark[4]}`,
  borderRadius: "8px",
  flexDirection: "column",
  [`@media (max-width:${breakpoints.lg})`]: {
    width: "100%",
    height: "100%",
  },
});

export const scrollContainerSx = (): CSSObject => ({
  height: "100%",
  width: "100%",
  overflow: "auto",
});

export const imagesFlexContainerSx = (): CSSObject => ({
  height: "96%",
  width: "96%",
  flexWrap: "wrap",
  alignContent: "flex-start",
  caretColor: "transparent",
  cursor: "default",
  ":focus-visible": {
    outline: "none",
  },
});

export const imageAreaInfoContainerSx = (): CSSObject => ({
  height: "100%",
  width: "100%",
  flexDirection: "column",
});

export const imageAreaInfoHeaderSx = (): CSSObject => ({ fontSize: "1.8rem" });

export const imageAreaInfoListSx = (): CSSObject => ({
  color: "white",
  fontSize: "1.3rem",
});

export const sidebarImageContainerSx = (): CSSObject => ({
  width: "100px",
  height: "100px",
  overflow: "hidden",
  border: "2px solid white",
  margin: "1px",
  touchAction: "none",
});

export const imageAreaInfoListStyles: Styles<ListStylesNames, Record<string, any>> = {
  itemWrapper: { marginTop: "30px" },
};

export const addFileButtonAreaSx = (): CSSObject => ({ width: "100%" });

export const addFileButtonSx = ({ colors }: MantineTheme): CSSObject => ({
  width: "100%",
  background: colors.dark[6],
  borderTop: `1px solid ${colors.dark[3]}`,
  ":hover": {
    background: colors.dark[5],
  },
});

export const actionButtonsGroupSx = ({ breakpoints }: MantineTheme): CSSObject => ({
  width: "100%",
  height: "15%",
  flexWrap: "wrap",
  [`@media (max-width:${breakpoints.lg})`]: {
    height: "50px",
  },
});

export const actionButtonsSx = ({ colors, breakpoints }: MantineTheme): CSSObject => ({
  width: "50%",
  height: "50%",
  color: "white",
  backgroundColor: colors.dark[8],
  border: `2px solid ${colors.dark[4]}`,
  cursor: "pointer",
  ":hover": {
    background: `${colors.dark[6]}`,
  },
  [`@media (max-width:${breakpoints.lg})`]: {
    width: "25%",
    height: "100%",
    borderRadius: "3px",
  },
});
