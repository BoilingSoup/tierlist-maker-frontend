import { useWindowEvent } from "@mantine/hooks";
import { Dispatch, SetStateAction } from "react";
import { useClientSideImageID } from "../../../hooks/store/useClientSideImageID";
import { ClientSideImage } from "../types";

type Param = Dispatch<SetStateAction<ClientSideImage[]>>;

export const usePasteEvent = (setImageSources: Param) => {
  useWindowEvent("paste", (event: Event) => {
    if (!(event instanceof ClipboardEvent)) {
      return;
    }
    if (!event.clipboardData?.files?.length) {
      return;
    }
    if (event.clipboardData.files.length <= 0) {
      return;
    }

    const file = event.clipboardData.files[0];
    if (file.type.startsWith("image/")) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        // TODO: compress/resize images before displaying

        // let img = new Image();
        // img.onload = () => {
        // console.log(img.width);
        // console.log(img.height);
        // };
        setImageSources((prev) => [
          ...prev,
          {
            id: useClientSideImageID.getState().getID(),
            src: fileReader.result as string,
          },
        ]);
      };

      fileReader.readAsDataURL(file);
    }
  });
};
