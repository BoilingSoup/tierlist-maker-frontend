const emToPx = 16; // 1em === 16px

export const convertThemeBreakpointToPx = (breakpoint: string) => {
  const smBreakpointEmInt = +breakpoint.split("em").shift()!;
  return smBreakpointEmInt * emToPx;
};
