import { FlexProps, TitleProps } from "@mantine/core";
import { NAVBAR_HEIGHT } from "../../components/common/styles";

export const authFlexProps: FlexProps = {
  direction: "column",
  justify: "flex-start",
  align: "center",
  rowGap: "xl",
  sx: {
    backgroundColor: "black",
    color: "white",
    height: `calc(100vh - ${NAVBAR_HEIGHT})`,
    ["& .mantine-TextInput-label, .mantine-PasswordInput-label"]: { color: "white" }
  }
};

export const authTitleProps: TitleProps = {
  size: 50,
  mt: "xl"
};
