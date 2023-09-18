import {
  ButtonStylesParams,
  CSSObject,
  ListStylesNames,
  MantineTheme,
  ModalBaseStylesNames,
  Styles,
} from "@mantine/core";
import { CSSProperties } from "react";
import { ImageSize } from "../../hooks/store/useResponsiveImagesStore";
import { NAVBAR_HEIGHT } from "../common/styles";
import { MAX_IMAGE_SIZE } from "./constants";
import { PxSize } from "./types";

export const createPageMainContainerSx = ({ breakpoints }: MantineTheme): CSSObject => ({
  flexDirection: "column",
  width: "100%",
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  [`@media (min-width: ${breakpoints.lg})`]: {
    flexDirection: "row",
  },
});

export const rowsContainerSx = ({ colors, breakpoints }: MantineTheme): CSSObject => ({
  width: "100%",
  height: `calc(100vh - ${NAVBAR_HEIGHT} - ${MOBILE_BOTTOM_BAR})`,
  backgroundColor: colors.dark[7],
  overflow: "auto",
  [`@media (min-width: ${breakpoints.lg})`]: {
    width: "75%",
    height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  },
});

export const rowButtonsContainerSx = (): CSSObject => ({ background: "black", width: "120px" });

export const rowButtonsSx = ({ fn }: MantineTheme): CSSObject => ({
  color: "#FFFFFF",
  ":hover": {
    background: "none",
    color: fn.darken("#FFFFFF", 0.3),
  },
});

export const rowArrowsContainerSx = (): CSSObject => ({ flexDirection: "column", justifyContent: "space-evenly" });

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
  overflowX: "auto",
  [`@media (min-width:${breakpoints.lg})`]: {
    width: "100%",
    overflow: "auto",
  },
});

export const imagesFlexContainerSx = ({ breakpoints }: MantineTheme): CSSObject => ({
  display: "flex",
  gap: "0.3ch",
  height: "96%",
  width: "96%",
  alignItems: "center",
  alignContent: "flex-start",
  caretColor: "transparent",
  cursor: "default",
  ":focus-visible": {
    outline: "none",
  },
  [`@media (min-width:${breakpoints.lg})`]: {
    display: "flex",
    alignItem: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
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

export const getSidebarImageContainerSx =
  (size: ImageSize) =>
  ({ colors }: MantineTheme): CSSObject => ({
    flexShrink: 0,
    width: size,
    height: size,
    maxHeight: MAX_IMAGE_SIZE,
    maxWidth: MAX_IMAGE_SIZE,
    overflow: "hidden",
    margin: "2px",
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
    height: "40px",
  },
});

export const addFileButtonSx = ({ colors, breakpoints }: MantineTheme): CSSObject => ({
  width: "100%",
  height: "100%",
  background: colors.dark[6],
  border: `1px solid ${colors.dark[3]}`,
  ":hover": {
    background: colors.dark[7],
  },
  [`@media (min-width:${breakpoints.lg})`]: {
    border: 0,
    borderTop: `1px solid ${colors.dark[3]}`,
  },
});

export const addFileButtonStyles: Styles<
  "root" | "label" | "icon" | "leftIcon" | "rightIcon" | "centerLoader" | "inner",
  ButtonStylesParams
> = {
  root: { width: "100%", padding: 0 },
};

export const addFileButtonTextSx = ({ breakpoints, fontSizes }: MantineTheme): CSSObject => ({
  fontSize: fontSizes.sm,
  [`@media (min-width:${breakpoints.xs})`]: {
    fontSize: fontSizes.xl,
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
  flexDirection: "column",
  fontSize: "0.6rem",
  width: "25%",
  height: "100%",
  color: "white",
  backgroundColor: colors.dark[6],
  border: `2px solid ${colors.dark[4]}`,
  borderRadius: "3px",
  cursor: "pointer",
  ":hover": {
    background: `${colors.dark[8]}`,
  },
  [`@media (min-width:${breakpoints.sm})`]: {
    flexDirection: "row",
    fontSize: "0.9rem",
  },
  [`@media (min-width:${breakpoints.lg})`]: {
    width: "50%",
    height: "50%",
    borderRadius: 0,
  },
});

export const getRowSettingsModalStyles = ({
  colors,
  fontSizes,
  spacing,
}: MantineTheme): Styles<ModalBaseStylesNames, never> => ({
  content: { background: colors.dark[4] },
  body: { background: colors.dark[4] },
  title: { color: "white", fontSize: fontSizes.xl, marginBottom: spacing.md },
  header: { alignItems: "flex-start", background: colors.dark[4] },
  close: { color: "white", ":hover": { background: "none" } },
});

export const modalStyles: Styles<ModalBaseStylesNames, never> = {
  content: {
    background: "transparent",
  },
  overlay: { background: "rgba(0, 0, 0, 0.92)" },
};

const previewWidth = "80%";
export const exportedImageStyle: CSSProperties = {
  width: previewWidth,
  maxHeight: "80vh",
  display: "block",
  margin: "auto",
};

export const modalButtonsContainerSx = ({ spacing }: MantineTheme) => ({
  width: previewWidth,
  margin: `${spacing.sm} auto 0 auto`,
  justifyContent: "flex-end",
  gap: spacing.xs,
});
