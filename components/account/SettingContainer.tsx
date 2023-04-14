import { Box, BoxProps } from "@mantine/core";
import { PxSize } from "../tierlist/types";

type Props = BoxProps;

const defaultContainerWidth: PxSize = "500px";
const defaultMx = "auto";

export const SettingContainer = (props: Props) => {
  const boxProps = {
    ...props,
    w: props.w ?? defaultContainerWidth,
    mx: props.mx ?? defaultMx,
  };

  return <Box {...boxProps}>{props.children}</Box>;
};
