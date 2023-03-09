import { useWindowEvent } from "@mantine/hooks";

type Param = {
  opened: boolean;
  toggle: () => void;
  breakpoint: number;
};

export const useCloseHamburgerOnWindowResize = ({
  opened,
  toggle,
  breakpoint,
}: Param) => {
  const closeIfBigScreen = (event: Event) => {
    const { innerWidth } = event.target as Window;

    console.log(breakpoint);
    if (opened && innerWidth >= breakpoint) {
      toggle();
    }
  };

  useWindowEvent("resize", closeIfBigScreen);
};
