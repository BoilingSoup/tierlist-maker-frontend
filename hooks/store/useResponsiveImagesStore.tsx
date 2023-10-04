import { useLayoutEffect } from "react";
import { create } from "zustand";
import { pxToNumber } from "../../components/common/helpers";
import { NAVBAR_HEIGHT } from "../../components/common/styles";
import { DEFAULT_IMAGE_SIZE, ROWS_TO_FIT_PERFECTLY_ON_SCREEN } from "../../components/tierlist/constants";
import { PxSize } from "../../components/tierlist/types";

export type ImageSize = PxSize | `clamp(${string}, ${string}, ${string})`;

type ResponsiveImageSize = {
  size: ImageSize;
  set: (size: ImageSize) => void;
};

/**
 * Store dynamic height in this store with window.addEventListener('resive' ...) at root level of app.
 * To be accessed through out the app.
 */
export const useResponsiveImageSize = create<ResponsiveImageSize>((set) => ({
  size: DEFAULT_IMAGE_SIZE,
  set: (size) => set({ size }),
}));

export const useCalculateResponsiveImageSize = () => {
  const setSize = useResponsiveImageSize((state) => state.set);

  useLayoutEffect(() => {
    const updateCalculation = () => {
      const [viewportHeight, viewportWidth] = [window.innerHeight, window.innerWidth];
      const shrinkImagesBasedOnScreenWidthIfViewportWidthIsSmallerThan = 1400;

      let size: ImageSize;

      if (viewportWidth > shrinkImagesBasedOnScreenWidthIfViewportWidthIsSmallerThan) {
        size = `${(viewportHeight - pxToNumber(NAVBAR_HEIGHT)) / ROWS_TO_FIT_PERFECTLY_ON_SCREEN}px`;
      } else {
        size = `${
          viewportWidth / 1.4 / ROWS_TO_FIT_PERFECTLY_ON_SCREEN
          // TODO: get rid of magic # 1.4
        }px`;
      }

      setSize(size);
    };

    updateCalculation();
    const cb = updateCalculation;

    window.addEventListener("resize", cb);

    return () => {
      window.removeEventListener("resize", cb);
    };
  }, []);
};
