import { CSSObject, FlexProps, TitleProps } from "@mantine/core";
import { NAVBAR_HEIGHT } from "../../components/common/styles";

const backdrop: CSSObject = {
  background: "linear-gradient(60deg, cyan, hotpink)"
};

export const backdropBoxSx = (): CSSObject => ({
  height: 400,
  width: 400,
  backgroundColor: "white",
  position: "absolute",
  transform: `rotate(60deg)`,
  opacity: 0.2
});

export const authFlexProps: FlexProps = {
  direction: "column",
  justify: "center",
  align: "center",
  rowGap: "xl",
  sx: {
    ...backdrop,
    overflow: "hidden",
    height: `calc(100vh - ${NAVBAR_HEIGHT})`,
    ["& .mantine-TextInput-label, .mantine-PasswordInput-label"]: {},
    ["> div:first-child"]: {
      top: 10,
      left: -300
    },
    ["> div:nth-child(2)"]: {
      backgroundColor: "black",
      top: 200,
      right: -300
    },
    ["> div:nth-child(3)"]: {
      bottom: -300,
      left: 200
    }
  }
};

export const authTitleProps: TitleProps = {
  size: 50,
  mt: "xl"
};
