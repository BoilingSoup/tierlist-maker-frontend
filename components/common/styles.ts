import { CSSObject, MantineTheme, NotificationStylesParams, Styles } from "@mantine/core";
import { CSSProperties } from "react";
import { CalcSize, PxSize } from "../tierlist/types";

export const displayNone: CSSObject = {
  display: "none",
};

const marginYAuto = {
  margin: "auto 0",
};

export const homeLinkStyle: CSSProperties = {
  ...marginYAuto,
  textDecoration: "none",
};

export const NAVBAR_HEIGHT: PxSize = "54px";

export const navbarSx = ({ colors }: MantineTheme): CSSObject => ({
  position: "fixed",
  background: `linear-gradient(${colors.dark[9]}, ${colors.dark[8]}, ${colors.dark[7]})`,
  height: NAVBAR_HEIGHT,
  width: "100%",
  justifyContent: "space-between",
  zIndex: 2,
});

export const logoFlexSx = (): CSSObject => ({
  justifyContent: "center",
  alignItems: "center",
});

export const desktopNavLinkBoxSx = (): CSSObject => ({
  width: "120px",
});

const navTextCSS: CSSObject = {
  color: "white",
  fontWeight: 600,
  ...marginYAuto,
};

export const getNavLinkTextSx = (isCurrentPath?: boolean): (() => CSSObject) | ((theme: MantineTheme) => CSSObject) =>
  isCurrentPath ? navLinkTextCurrentSx : navLinkTextSx;

const navLinkBeforeElement: CSSObject = {
  width: "80%",
  bottom: 0,
  content: '""',
  position: "absolute",
  borderRadius: 100,
};

export const navLinkTextSx = (): CSSObject => ({
  ...navTextCSS,
  borderRadius: 10,
  padding: "5px 15px",
  textDecoration: "none",
  lineHeight: 1.55, // makes <a> and <button> consistent by explicitly defining and avoiding browser defaults.
  position: "relative",
  ":hover": {
    "::before": {
      height: "3px",
    },
  },
  "::before": {
    ...navLinkBeforeElement,
    transition: "100ms",
    height: "0%",
    opacity: 0.75,
    backgroundColor: "white",
  },
});

export const navLinkTextCurrentSx = ({ colors }: MantineTheme): CSSObject => ({
  ...navLinkTextSx(),
  "::before": {
    ...navLinkBeforeElement,
    height: "3px",
    backgroundColor: colors.cyan[3],
  },
});

export const signOutButtonSx = (): CSSObject => ({
  width: "inherit",
  background: "none",
  border: "none",
  cursor: "pointer",
  ...navLinkTextSx(),
});

export const logoTextSx = (): CSSObject => ({
  ...navTextCSS,
  fontSize: "1.5rem",
  paddingLeft: "1ch",
});

const landingSectionHeight: CalcSize = `calc(95vh - ${NAVBAR_HEIGHT})`;

export const landingTierListContainerSx = ({ colors }: MantineTheme): CSSObject => ({
  position: "absolute",
  width: "100%",
  height: landingSectionHeight,
  zIndex: -1,
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: `radial-gradient(ellipse at top, ${colors.dark[2]}, ${colors.dark[7]})`,
});

export const landingSectionForegroundSx = (): CSSObject => ({
  textAlign: "center",
  margin: "auto",
  height: landingSectionHeight,
  width: "90%",
  maxWidth: "900px",
  flexDirection: "column",
});

export const landingSectionTextSx = (): CSSObject => ({
  fontSize: "clamp(2.5rem, 6vw, 3rem)",
  color: "white",
});

export const mobileNavLinksOverlaySx = ({ colors }: MantineTheme): CSSObject => ({
  position: "fixed",
  zIndex: 2,
  backgroundColor: colors.dark[9],
  width: "100%",
  marginTop: NAVBAR_HEIGHT,
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
});

export const mobileNavLinksContainerSx = (): CSSObject => ({
  flexDirection: "column",
});

const MOBILE_NAV_LINK_ACTIVE_BG = "#0c8599";

const mobileNavLinkPseudoStyles: CSSObject = {
  outline: "none",
  backgroundColor: MOBILE_NAV_LINK_ACTIVE_BG,
};

export const mobileNavLinkSx = ({ colors }: MantineTheme): CSSObject => ({
  backgroundColor: colors.dark[9],
  color: "white",
  height: "70px",
  fontSize: "1.2rem",
  lineHeight: 1.55, // makes <a> and <button> consistent by explicitly defining and avoiding browser defaults.
  textDecoration: "none",
  ":hover": {
    ...mobileNavLinkPseudoStyles,
  },
  ":focus": {
    ...mobileNavLinkPseudoStyles,
  },
  ":focus-within": {
    ...mobileNavLinkPseudoStyles,
  },
  ":focus-visible": {
    ...mobileNavLinkPseudoStyles,
  },
});

export const mobileSignOutButtonSx = (theme: MantineTheme): CSSObject => ({
  width: "inherit",
  background: "none",
  border: "none",
  cursor: "pointer",
  ...mobileNavLinkSx(theme),
});

const currentMobileNavLinkSx = (theme: MantineTheme): CSSObject => ({
  ...mobileNavLinkSx(theme),
  backgroundColor: MOBILE_NAV_LINK_ACTIVE_BG,
});

export const getMobileNavLinkSx = (isCurrentPath: boolean) =>
  isCurrentPath ? currentMobileNavLinkSx : mobileNavLinkSx;

export const getNotificationStyles = (
  background: string
): Styles<"icon" | "body" | "title" | "root" | "description" | "closeButton" | "loader", NotificationStylesParams> => ({
  root: {
    background,
    border: "none",
  },
  closeButton: {
    color: "white",
    ":hover": {
      background: "none",
    },
  },
  title: {
    color: "white",
    fontWeight: "bold",
  },
  description: {
    color: "white",
  },
  icon: {
    color: "white",
  },
});

export const text404Sx = ({ colors }: MantineTheme): CSSObject => ({
  color: colors.dark[0],
  fontSize: "3rem",
  textAlign: "center",
});

export const container404Content = (): CSSObject => ({
  justifyContent: "center",
});

export const page404Sx = ({ colors }: MantineTheme): CSSObject => ({
  background: `radial-gradient(ellipse at top, ${colors.dark[4]}, ${colors.dark[9]})`,
  width: "100%",
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
});

export const footerLinkSx = ({ colors }: MantineTheme): CSSObject => ({
  width: "36px",
  height: "36px",
  border: "1px solid gray",
  borderRadius: "100px",
  ":hover": { background: colors.dark[4] },
});

export const footerContainerSx = ({ spacing, colors }: MantineTheme): CSSObject => ({
  background: colors.gray[9],
  color: "white",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: `calc(${spacing.xl} + ${spacing.lg})`,
  paddingBottom: `calc(${spacing.xl} + ${spacing.sm})`,
});
