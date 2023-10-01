import { useMutation } from "react-query";
import { DOM_TO_PNG_ID } from "../../components/tierlist/constants";
import { compressImage } from "../../components/tierlist/helpers";
import { ClientSideImage, DiffData, TierListData } from "../../components/tierlist/types";
import { THUMBNAIL_WIDTH } from "../../config/config";
import DomToImage from "dom-to-image";
import { upload } from "./helpers";

export const useSaveTierListMutation = () => {
  return useMutation(handleDiffMetadata, {
    //
  });
};

type HandleDiffMetadataParam = {
  setHideToolbars: (v: boolean) => void;
  diffMetadata: DiffData["metadata"];
  data: TierListData;
  requestProgress: number;
  setRequestProgress: (v: number) => void;
};

async function handleDiffMetadata({
  setHideToolbars,
  diffMetadata: { added, deleted },
  data,
  requestProgress,
  setRequestProgress,
}: HandleDiffMetadataParam) {
  const formData = await generateFormData({ setHideToolbars, data, added });
  const res = await upload({ formData, requestProgress, setRequestProgress });

  //
  // TODO: delete old thumbnail

  // TODO: delete from deleted

  return res.data;
}

type GenerateFormDataParam = {
  setHideToolbars: (v: boolean) => void;
  data: TierListData;
  added: DiffData["metadata"]["added"];
};

async function generateFormData({ setHideToolbars, data, added }: GenerateFormDataParam) {
  // grab the new images from `data` by using the metadata["added"] info.
  // store it in an array
  let images: any[] = [];

  // NOTE: thumbnail is always first. This should be refactored to be more programatic-over-convention... but works and is simple enough for now.
  const div = document.getElementById(DOM_TO_PNG_ID)! as HTMLDivElement;
  setHideToolbars(true);
  images.push(
    DomToImage.toBlob(div)
      .then((blob) => {
        return compressImage(new File([blob], "blob", { type: "image/jpeg" }), THUMBNAIL_WIDTH);
      })
      .catch((err) => console.error(err))
      .finally(() => setHideToolbars(false))
  );

  let img: ClientSideImage;
  for (let image of added) {
    switch (image.location) {
      case "sidebar":
        img = data.sidebar[image.index];
        images.push(fetch(img.src).then((res) => res.blob()));
        break;

      case "row":
        const rowID = image.rowID;
        const rowIndex = data.rows.findIndex((row) => row.id === rowID);
        img = data.rows[rowIndex].items[image.index];
        images.push(fetch(img.src).then((res) => res.blob()));
        break;

      default:
        break;
    }
  }

  images = await Promise.all(images);

  const fd = new FormData();

  const LARAVEL_MULTI_FILE_INPUT_SUFFIX = "[]"; // Laravel looks for suffix "[]" in the input name to run multi file validations
  const FORM_DATA_KEY = "image" + LARAVEL_MULTI_FILE_INPUT_SUFFIX;

  for (let i = 0; i < images.length; ++i) {
    fd.append(FORM_DATA_KEY, images[i]);
  }

  return fd;
}
