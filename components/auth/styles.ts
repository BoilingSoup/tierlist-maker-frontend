import { CSSObject } from "@mantine/core";
import { NAVBAR_HEIGHT } from "../../components/common/styles";

const backdrop: CSSObject = {
  background: "linear-gradient(60deg, cyan, hotpink)",
};

export const backdropBoxSx = (): CSSObject => ({
  position: "absolute",
  height: 400,
  width: 400,
  backgroundColor: "white",
  opacity: 0.2,
  transform: `rotate(60deg)`,
});

export const formPageContainerSx = (): CSSObject => ({
  position: "relative",
  background: "gray",
  overflow: "hidden",
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
});

export const formContainerSx = (): CSSObject => ({
  alignItems: "center",
  width: "90%",
  height: "80%",
  maxWidth: "500px",
  maxHeight: "725px",
  backgroundColor: "white",
  borderRadius: "12px",
  zIndex: 1,
});

export const authTitleSx = (): CSSObject => ({
  fontSize: `clamp(2rem, 6vw, 3rem)`,
  margin: "20px",
});

export const formStyle: React.CSSProperties = {
  height: "100%",
  width: "100%",
};

export const formContentsContainerSx = (): CSSObject => ({
  margin: "auto",
  alignItems: "center",
  width: "90%",
  height: "90%",
});
