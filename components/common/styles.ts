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

const navTextCSS: CSSObject = {
  color: "white",
  paddingBlock: "6px",
  paddingInline: "10px",
  ...marginYAuto,
};

export const getNavLinkTextSx = (isCurrentPath: boolean): CSSObject =>
  isCurrentPath ? navLinkTextCurrentSx() : navLinkTextSx();

export const navLinkTextSx = (): CSSObject => ({
  ...navTextCSS,
  borderRadius: 10,
});

export const navLinkTextCurrentSx = (): CSSObject => ({
  ...navLinkTextSx(),
  backgroundColor: "#15aabf",
  color: "white",
});

export const logoTextSx = (): CSSObject => ({
  ...navTextCSS,
  fontSize: "1.5rem",
  paddingLeft: "1ch",
});

const landingSectionHeight = "80vh";

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
  maxWidth: "700px",
  flexDirection: "column",
});

export const landingSectionTextSx = (): CSSObject => ({
  fontSize: "3rem",
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
