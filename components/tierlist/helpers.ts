import { useFullscreen } from "@mantine/hooks";
import { FullScreenProp } from "./types";

/** Converts value of useFullscreen() to prop used in components */
export const getFullScreenProp = (
  fullScreen: ReturnType<typeof useFullscreen>
): FullScreenProp => ({
  toggle: fullScreen.toggle,
  state: fullScreen.fullscreen,
});
