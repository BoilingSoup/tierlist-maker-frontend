import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const useIsDesktopScreen = () => {
  const { breakpoints } = useMantineTheme();
  return useMediaQuery(`(min-width: ${breakpoints.lg})`);
};
