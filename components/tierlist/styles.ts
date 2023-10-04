import {
  ButtonStylesParams,
  CSSObject,
  keyframes,
  ListStylesNames,
  MantineTheme,
  ModalBaseStylesNames,
  Styles,
  SwitchStylesNames,
  SwitchStylesParams,
  TextInputStylesNames,
} from "@mantine/core";
import { CSSProperties } from "react";
import { User } from "../../contexts/AuthProvider";
import { ImageSize } from "../../hooks/store/useResponsiveImagesStore";
import { pxToNumber } from "../common/helpers";
import { NAVBAR_HEIGHT } from "../common/styles";
import { MAX_IMAGE_SIZE, ROWS_TO_FIT_PERFECTLY_ON_SCREEN } from "./constants";
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

export const MOBILE_BOTTOM_BAR: PxSize = "220px";

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

const IMAGE_AREA_CONTAINER_WIDTH = "92%";

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
    width: IMAGE_AREA_CONTAINER_WIDTH,
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
    position: "relative",
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
  alignItems: "center",
  flexWrap: "wrap",
  [`@media (min-width:${breakpoints.lg})`]: {
    height: "15%",
  },
});

export const actionButtonsSx =
  (user: User) =>
  ({ colors, breakpoints }: MantineTheme): CSSObject => ({
    flexDirection: "column",
    fontSize: "0.6rem",
    width: user ? "25%" : "50%",
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
      height: user ? "50%" : "100%",
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

export const modalButtonsContainerSx = ({ spacing }: MantineTheme): CSSObject => ({
  width: previewWidth,
  margin: `${spacing.sm} auto 0 auto`,
  justifyContent: "flex-end",
  gap: spacing.xs,
});

export const modAllImagesContainerSx = ({ spacing, breakpoints }: MantineTheme): CSSObject => ({
  width: "98%",
  height: "40px",
  margin: "auto",
  justifyContent: "space-between",
  marginTop: spacing.sm,
  marginBottom: spacing.sm,
  [`@media (min-width: ${breakpoints.lg})`]: {
    width: IMAGE_AREA_CONTAINER_WIDTH,
    marginTop: spacing.lg,
    marginBottom: 0,
  },
});

export const switchStyles: Styles<SwitchStylesNames, SwitchStylesParams> = {
  thumb: { background: "rgb(180, 0, 0)" },
  label: { color: "white", fontWeight: "bold" },
};

const wiggle = keyframes`
  from {
    transform: rotateZ(4deg);
  }

  to {
    transform: rotateZ(-4deg)
  }
`;

export const imageDeleteBtnSx = ({ colors }: MantineTheme): CSSObject => ({
  color: "white",
  position: "absolute",
  zIndex: 9999,
  height: "20%",
  width: "20%",
  minWidth: "20px",
  minHeight: "20px",
  borderRadius: "9999px",
  backgroundColor: "red",
  top: 0,
  right: 0,
  border: "1px solid pink",
  animation: `${wiggle} 100ms ease-in-out infinite alternate`,
  ":hover": {
    background: colors.red[6],
  },
});

export const rowContainerSx =
  (viewportHeight: number) =>
  ({ breakpoints }: MantineTheme) => ({
    border: "2px solid black",
    minHeight: (viewportHeight - pxToNumber(NAVBAR_HEIGHT)) / ROWS_TO_FIT_PERFECTLY_ON_SCREEN,
    [`@media (max-width: ${breakpoints.md})`]: {
      minHeight:
        (viewportHeight - pxToNumber(NAVBAR_HEIGHT) - pxToNumber(MOBILE_BOTTOM_BAR)) / ROWS_TO_FIT_PERFECTLY_ON_SCREEN,
    },
  });

export const rowLabelContainerSx = (size: ImageSize, color: string) => (): CSSObject => ({
  minWidth: "100px",
  width: size,
  backgroundColor: color,
  color: "black",
  fontSize: "clamp(2rem, 6vw, 3rem)",
  borderRight: "2px solid black",
});

export const rowImagesContainerSx = ({ colors, fn, breakpoints }: MantineTheme): CSSObject => ({
  width: "100%",
  backgroundImage: `radial-gradient(ellipse, ${colors.dark[9]}, ${fn.lighten(colors.dark[8], 0.03)})`,
  margin: "0.1ch",
  display: "flex",
  gap: "0.1ch",
  flexWrap: "wrap",
  height: "auto",
  [`@media (min-width: ${breakpoints.md})`]: {
    alignItems: "center",
    margin: "0.3ch",
    gap: "0.3ch",
  },
});

export const saveModalStyles: Styles<ModalBaseStylesNames, never> = (theme: MantineTheme) => ({
  title: { fontWeight: "bolder" },
  root: { background: theme.colors.dark[4] },
  header: { background: theme.colors.dark[4], color: "white" },
  body: { background: theme.colors.dark[4] },
});

export const titleInputStyles: Styles<TextInputStylesNames, Record<string, any>> = (theme: MantineTheme) => ({
  label: { color: "white", fontWeight: "bolder" },
  input: {
    backgroundColor: theme.colors.dark[6],
    border: "none",
    color: "white",
    ":disabled": {
      background: theme.colors.dark[5],
    },
  },
});

export const descriptionInputStyles: Styles<TextInputStylesNames, Record<string, any>> = (theme: MantineTheme) => ({
  root: { marginTop: theme.spacing.sm },
  label: { color: "white", fontWeight: "bolder" },
  input: {
    backgroundColor: theme.colors.dark[6],
    border: "none",
    color: "white",
    ":disabled": {
      background: theme.colors.dark[5],
    },
  },
});

export const tierListSkeletonSx = ({ colors }: MantineTheme): CSSObject => ({
  width: "100%",
  height: "100%",
  "&::before": { background: colors.dark[6] },
  "&::after": { background: colors.dark[8] },
});

const submitSaveButtonWidth = "100px";

export const submitSaveButtonSx = ({ colors, spacing }: MantineTheme): CSSObject => ({
  display: "block",
  width: submitSaveButtonWidth,
  marginTop: spacing.lg,
  ":disabled": { backgroundColor: colors.gray[8] },
});

export const uploadProgressContainerSx = (): CSSObject => ({
  width: `calc(100% - ${submitSaveButtonWidth})`,
});

export const autoAnimateRowContainerSx = ({ colors }: MantineTheme): CSSObject => ({
  background: colors.dark[7],
});

export const savingOverlayContainerSx = (): CSSObject => ({
  zIndex: 9000,
  color: "white",
  height: "100%",
  width: "100%",
  position: "absolute",
  background: "rgba(0, 0, 0, 0.6)",
  flexDirection: "column",
});

const tierListCardContainerWidth: CSSObject = {
  width: "90%",
  maxWidth: "600px",
};

export const tierListCardContainerSx = (theme: MantineTheme): CSSObject => ({
  ...tierListCardContainerWidth,
  background: theme.colors.dark[6],
  borderRadius: theme.radius.sm,
  transition: "transform 100ms ease",
  ":hover": {
    transform: "scale(1.02)",
  },
});

export const tierListCardSkeletonSx = ({ colors }: MantineTheme): CSSObject => ({
  ...tierListCardContainerWidth,
  height: "300px",
  "&::before": { background: colors.dark[5] },
  "&::after": { background: colors.dark[8] },
});
