import { useWindowEvent } from "@mantine/hooks";
import { useDebouncedCallback } from "use-debounce";

type Param = {
  opened: boolean;
  toggle: () => void;
  debounceMs: number;
  breakpoint: number;
};

export const useCloseHamburgerOnWindowResize = ({
  opened,
  toggle,
  debounceMs,
  breakpoint,
}: Param) => {
  const closeIfBigScreen = useDebouncedCallback((event: Event) => {
    const { innerWidth } = event.target as Window;

    if (opened && innerWidth >= breakpoint) {
      toggle();
    }
  }, debounceMs);

  useWindowEvent("resize", closeIfBigScreen);
};
