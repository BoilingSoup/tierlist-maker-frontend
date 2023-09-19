import { useWindowEvent } from "@mantine/hooks";
import { nanoid } from "nanoid";
import { compressImage } from "../helpers";
import { TierListData } from "../types";

type Arg = (prev: TierListData) => TierListData;
type Param = (fn: Arg) => Promise<void>;

export const usePasteEvent = (setData: Param) => {
  useWindowEvent("paste", async (e: Event) => {
    const event = e as ClipboardEvent;

    if (!event.clipboardData?.files?.length) {
      return;
    }

    if (event.clipboardData.files.length <= 0) {
      return;
    }

    const file = event.clipboardData.files[0];

    if (!file.type.startsWith("image/")) {
      return;
    }

    try {
      const compressedFile = await compressImage(file);

      const fileReader = new FileReader();

      fileReader.onload = async () => {
        const data = fileReader.result;
        const isExpectedImgSrcData = typeof data === "string";

        if (!isExpectedImgSrcData) {
          return;
        }

        setData((prev) => ({
          sidebar: [...prev.sidebar, { id: nanoid(), src: data }],
          rows: [...prev.rows],
        }));
      };

      fileReader.readAsDataURL(compressedFile);
    } catch (e) {
      // TODO: handle error
    }
  });
};
