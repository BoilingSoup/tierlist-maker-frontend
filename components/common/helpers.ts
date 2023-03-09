import { MantineSizes } from "@mantine/core";

const emToPx = 16; // 1em === 16px

export const convertThemeBreakpointToPx = (breakpoints: MantineSizes) => {
  const smBreakpointEmInt = +breakpoints.sm.split("em").shift()!;
  return smBreakpointEmInt * emToPx;
};
