import { CSSObject } from "@mantine/core";
import { CSSProperties } from "react";

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

export const NAVBAR_HEIGHT = "64px";

export const navbarSx = (): CSSObject => ({
  position: "fixed",
  backgroundColor: "black",
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
  width: "80px",
});

const navTextCSS: CSSObject = {
  color: "white",
  ...marginYAuto,
};

export const getNavLinkTextSx = (isCurrentPath: boolean): CSSObject =>
  isCurrentPath ? navLinkTextCurrentSx() : navLinkTextSx();

export const navLinkTextSx = (): CSSObject => ({
  ...navTextCSS,
  borderRadius: 10,
  padding: "5px 15px",
  textDecoration: "none",
});

export const navLinkTextCurrentSx = (): CSSObject => ({
  ...navLinkTextSx(),
  backgroundColor: "#15aabf",
});

export const logoTextSx = (): CSSObject => ({
  ...navTextCSS,
  fontSize: "1.5rem",
  paddingLeft: "1ch",
});

const landingSectionHeight = "85vh";

export const landingTierListContainerSx = (): CSSObject => ({
  position: "absolute",
  width: "100%",
  height: landingSectionHeight,
  zIndex: -1,
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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

export const mobileNavLinksOverlaySx = (): CSSObject => ({
  position: "fixed",
  zIndex: 2,
  backgroundColor: "black",
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

export const mobileNavLinkSx = (): CSSObject => ({
  backgroundColor: "black",
  color: "white",
  height: "70px",
  fontSize: "1.2rem",
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

const currentMobileNavLinkSx = (): CSSObject => ({
  ...mobileNavLinkSx(),
  backgroundColor: MOBILE_NAV_LINK_ACTIVE_BG,
});

export const getMobileNavLinkSx = (isCurrentPath: boolean) =>
  isCurrentPath ? currentMobileNavLinkSx : mobileNavLinkSx;
