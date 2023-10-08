import { RefObject, useEffect } from "react";
import { UserTierListsResponse } from "../types";

type Param = {
  tierList: UserTierListsResponse["data"][number];
  ref: RefObject<HTMLDivElement>;
};

export const useCenterThumbnailIfSmall = ({ tierList, ref }: Param) => {
  useEffect(() => {
    if (ref.current === null) {
      return;
    }
    const img = ref.current.querySelector("img")! as HTMLImageElement;

    const handleImageLoaded = () => {
      if (ref.current !== null && img.clientHeight < 200) {
        ref.current.style.display = "flex";
        ref.current.style.placeItems = "center";
      }
    };

    if (img.complete) {
      handleImageLoaded();
    } else {
      img.addEventListener("load", handleImageLoaded);
      return () => img.removeEventListener("load", handleImageLoaded);
    }
  }, [tierList, ref]);
};
