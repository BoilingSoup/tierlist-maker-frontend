import { CSSObject, ListStylesNames, MantineTheme, Styles } from "@mantine/core";
import { NAVBAR_HEIGHT } from "../common/styles";
import { PxSize } from "./types";

export const createPageMainContainer = ({ breakpoints }: MantineTheme): CSSObject => ({
  flexDirection: "column",
  width: "100%",
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  [`@media (min-width: ${breakpoints.lg})`]: {
    flexDirection: "row",
  },
});

export const rowsContainer = ({ colors, breakpoints }: MantineTheme): CSSObject => ({
  width: "100%",
  backgroundColor: colors.dark[7],
  overflow: "auto",
  [`@media (min-width: ${breakpoints.lg})`]: {
    width: "75%",
  },
});

export const MOBILE_BOTTOM_BAR: PxSize = "200px";

export const sidebarContainerSx = ({ colors, breakpoints }: MantineTheme): CSSObject => ({
  width: "100%",
  height: MOBILE_BOTTOM_BAR,
  flexDirection: "column-reverse",
  backgroundColor: colors.dark[8],
  color: "white",
  [`@media (min-width:${breakpoints.lg})`]: {
    width: "25%",
    height: "100%",
    flexDirection: "column",
  },
});

export const imageAreaMaxBoundsSx = ({ breakpoints }: MantineTheme): CSSObject => ({
  height: "85%",
  width: "100%",
  position: "relative",
  [`@media (min-width:${breakpoints.lg})`]: {
    flexDirection: "column",
  },
});

export const imageAreaContainerSx = ({ colors, breakpoints }: MantineTheme): CSSObject => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  border: `2px solid ${colors.dark[4]}`,
  borderRadius: "8px",
  [`@media (min-width:${breakpoints.lg})`]: {
    height: "94%",
    width: "92%",
    flexDirection: "column",
  },
});

export const scrollContainerSx = ({ breakpoints }: MantineTheme): CSSObject => ({
  height: "100%",
  width: "75%",
  overflow: "auto",
  [`@media (min-width:${breakpoints.lg})`]: {
    width: "100%",
  },
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

export const imageAreaInfoHeaderSx = (): CSSObject => ({ fontSize: "1.8rem", textAlign: "center" });

export const imageAreaInfoListSx = (): CSSObject => ({
  color: "white",
  fontSize: "1.3rem",
  "@media (max-width: 1540px)": {
    fontSize: "1.2rem",
  },
  "@media (max-width: 1450px)": {
    fontSize: "1.1rem",
  },
  "@media (max-width: 1320px)": {
    fontSize: "1rem",
  },
});

export const sidebarImageContainerSx = ({ colors }: MantineTheme): CSSObject => ({
  width: "100px",
  height: "100px",
  overflow: "hidden",
  border: "2px solid white",
  margin: "1px",
  touchAction: "none",
  ":focus-visible": {
    outline: `none`,
    border: `4px solid ${colors.blue[6]}`,
  },
});

export const imageAreaInfoListStyles: Styles<ListStylesNames, Record<string, any>> = {
  itemWrapper: { marginTop: "30px" },
};

export const addFileButtonAreaSx = ({ breakpoints }: MantineTheme): CSSObject => ({
  width: "25%",
  [`@media (min-width:${breakpoints.lg})`]: {
    width: "100%",
  },
});

export const addFileButtonSx = ({ colors, breakpoints }: MantineTheme): CSSObject => ({
  width: "100%",
  height: "100%",
  background: colors.dark[6],
  border: `1px solid ${colors.dark[3]}`,
  ":hover": {
    background: colors.dark[5],
  },
  [`@media (min-width:${breakpoints.lg})`]: {
    border: 0,
    borderTop: `1px solid ${colors.dark[3]}`,
  },
});

export const actionButtonsGroupSx = ({ breakpoints }: MantineTheme): CSSObject => ({
  width: "100%",
  height: "50px",
  flexWrap: "wrap",
  [`@media (min-width:${breakpoints.lg})`]: {
    height: "15%",
  },
});

export const actionButtonsSx = ({ colors, breakpoints }: MantineTheme): CSSObject => ({
  width: "25%",
  height: "100%",
  color: "white",
  backgroundColor: colors.dark[8],
  border: `2px solid ${colors.dark[4]}`,
  borderRadius: "3px",
  cursor: "pointer",
  ":hover": {
    background: `${colors.dark[6]}`,
  },
  [`@media (min-width:${breakpoints.lg})`]: {
    width: "50%",
    height: "50%",
    borderRadius: 0,
  },
});
