import { CSSObject } from "@mantine/core";

export const navbarSx = (): CSSObject => ({
  backgroundColor: "black",
  height: "52px",
  justifyContent: "space-between",
});

export const navTextSx = (): CSSObject => ({
  color: "white",
  margin: "auto 0",
});

export const landingTierListContainerSx = (): CSSObject => ({
  position: "absolute",
  height: "80vh",
  width: "100%",
  zIndex: -1,
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
