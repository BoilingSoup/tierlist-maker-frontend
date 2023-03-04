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

export const navbarSx = (): CSSObject => ({
  backgroundColor: "black",
  height: "64px",
  justifyContent: "space-between",
});

export const logoFlexSx = (): CSSObject => ({
  justifyContent: "center",
  alignItems: "center",
});

const navTextCSS: CSSObject = {
  color: "white",
  ...marginYAuto,
};

export const navLinkTextSx = (): CSSObject => ({
  ...navTextCSS,
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
