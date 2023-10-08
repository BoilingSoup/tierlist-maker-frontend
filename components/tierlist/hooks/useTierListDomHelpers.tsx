import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useFullscreen } from "@mantine/hooks";
import { useDndSensors } from "./useDndSensors";

/**
 * /create and /tierlist/[uuid] use these hooks. I merge it into one to make the components leaner.
 */
export const useTierListDomHelpers = () => {
  const fullScreen = useFullscreen();
  const sensors = useDndSensors();
  const [animateChildren] = useAutoAnimate();

  return { fullScreen, sensors, animateChildren };
};
