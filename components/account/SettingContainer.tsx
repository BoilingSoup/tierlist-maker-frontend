import { Box, BoxProps } from "@mantine/core";
import { PxSize } from "../tierlist/types";

type Props = BoxProps;

const defaultContainerMaxWidth: PxSize = "500px";
const defaultMx = "auto";

export const SettingContainer = (props: Props) => {
  const boxProps: BoxProps = {
    ...props,
    w: props.w ?? "100%",
    maw: props.maw ?? defaultContainerMaxWidth,
    mx: props.mx ?? defaultMx,
  };

  return <Box {...boxProps}>{props.children}</Box>;
};
