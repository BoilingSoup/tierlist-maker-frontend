import {
  CSSObject,
  MantineGradient,
  MantineTheme,
  Styles,
  TextInputStylesNames,
} from "@mantine/core";
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

export const FORM_WIDTH = "72%";

export const formStyle: React.CSSProperties = {
  marginTop: "40px",
  width: FORM_WIDTH,
};

export const formContentsContainerSx = (): CSSObject => ({
  margin: "auto",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

export const formControlSx = (): CSSObject => ({
  width: "100%",
  height: "90px",
});

export const fancyInputSx = (): CSSObject => ({
  width: "100%",
  margin: "auto",
});

export const inputStyles: Styles<TextInputStylesNames, Record<string, any>> = {
  input: {
    boxShadow: "3px 3px 6px -4px rgba(0,0,0,0.80)",
  },
};

export const formSubmitControlSx = (): CSSObject => ({
  ...formControlSx(),
  height: "auto",
});

export const formSubmitSx = (): CSSObject => ({
  display: "block",
  width: "100%",
  boxShadow: "6px 6px 8px -4px rgba(0,0,0,0.80)",
});

export const formSubmitGradient: MantineGradient = {
  from: "cyan",
  to: "indigo",
};

export const oauthContainerSx = (): CSSObject => ({
  flexDirection: "column",
  gap: 12,
  height: "100%",
  width: FORM_WIDTH,
  fontSize: "2rem",
});

export const oauthIconSx = (): CSSObject => ({
  boxShadow: "5px 5px 7px -4px rgba(0,0,0,0.80)",
});
