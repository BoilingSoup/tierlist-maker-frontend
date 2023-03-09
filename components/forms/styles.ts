import { CSSObject, MantineTheme } from "@mantine/core";
import { NAVBAR_HEIGHT } from "../../components/common/styles";

export const backdropBoxSx = (): CSSObject => ({
  position: "absolute",
  height: 400,
  width: 400,
  backgroundColor: "white",
  opacity: 0.2,
  transform: `rotate(55deg)`,
});

const FORM_BOX_SHADOW =
  "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)";

export const formPageContainerSx = (): CSSObject => ({
  position: "relative",
  background: "radial-gradient(ellipse at top, gray, black)",
  overflow: "hidden",
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
});

export const formContainerSx = (): CSSObject => ({
  flexDirection: "column",
  alignItems: "center",
  width: "90%",
  height: "85%",
  maxWidth: "500px",
  maxHeight: "780px",
  backgroundColor: "white",
  borderRadius: "12px",
  zIndex: 1,
  boxShadow: FORM_BOX_SHADOW,
});

export const authTitleSx = ({ colors }: MantineTheme): CSSObject => ({
  color: colors.dark[4],
  fontSize: `clamp(2rem, 6vw, 2.5rem)`,
  margin: "30px 0 20px 0",
});

export const formStyle: React.CSSProperties = {
  marginTop: "40px",
  width: "100%",
};

export const formContentsContainerSx = (): CSSObject => ({
  margin: "auto",
  justifyContent: "space-between",
  alignItems: "center",
  width: "90%",
  height: "90%",
});
