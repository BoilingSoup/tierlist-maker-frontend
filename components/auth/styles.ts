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

<<<<<<< HEAD
const FORM_BOX_SHADOW =
=======
const formBoxShadow =
>>>>>>> ce36460 (Move Register page form to separate component)
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
<<<<<<< HEAD
  boxShadow: FORM_BOX_SHADOW,
=======
  boxShadow: formBoxShadow,
>>>>>>> ce36460 (Move Register page form to separate component)
});

export const authTitleSx = (): CSSObject => ({
  fontSize: `clamp(2rem, 6vw, 2.5rem)`,
<<<<<<< HEAD
  margin: "30px 0 20px 0",
=======
  padding: "40px 0 10px 0",
>>>>>>> ce36460 (Move Register page form to separate component)
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
