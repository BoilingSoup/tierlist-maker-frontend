import { useWindowEvent } from "@mantine/hooks";
import { nanoid } from "nanoid";
import { Dispatch, SetStateAction } from "react";
import { ClientSideImage, TierListData } from "../types";

type Param = Dispatch<SetStateAction<TierListData>>;

export const usePasteEvent = (setData: Param) => {
  useWindowEvent("paste", (e: Event) => {
    const event = e as ClipboardEvent;

    const clipboardText = event.clipboardData?.getData("text/plain").trim();
    if (clipboardText) {
      const handleImageLinks = async () => {
        const checkImage = async (): Promise<boolean> => {
          const contentType = await fetch(clipboardText).then((res) => res.headers.get("content-type"));
          return typeof contentType === "string" && contentType.includes("image/");
        };

        const isImage = await checkImage();
        if (isImage) {
          const newImage: ClientSideImage = {
            id: nanoid(),
            src: clipboardText,
          };
          setData((prev) => ({
            sidebar: [...prev.sidebar, newImage],
            rows: [...prev.rows],
          }));
        } else {
          console.log("not an image"); // TODO: throw an error and show a toast or something....
        }
      };

      handleImageLinks();
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
        setData((prev) => ({
          sidebar: [...prev.sidebar, { id: nanoid(), src: fileReader.result as string }],
          rows: [...prev.rows],
        }));
      };

      fileReader.readAsDataURL(file);
    }
  });
};
