import { Box, SpacingValue, SystemProp } from "@mantine/core";
import { ReactElement } from "react";
import { PxSize } from "../tierlist/types";

type Props = {
  my?: SystemProp<SpacingValue>;
  children: ReactElement;
};

const settingContainerWidth: PxSize = "500px";

export const SettingContainer = ({ children, my }: Props) => {
  return (
    <Box w={settingContainerWidth} my={my} mx="auto">
      {children}
    </Box>
  );
};
