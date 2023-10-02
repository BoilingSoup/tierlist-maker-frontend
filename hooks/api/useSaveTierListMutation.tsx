import { useMutation } from "react-query";
import { DOM_TO_PNG_ID } from "../../components/tierlist/constants";
import { compressImage } from "../../components/tierlist/helpers";
import { ClientSideImage, DiffData, TierListData, TierListSchema } from "../../components/tierlist/types";
import { THUMBNAIL_WIDTH } from "../../config/config";
import DomToImage from "dom-to-image";
import { replaceThumbnail, saveTierList, tween, upload } from "./helpers";
import { showSomethingWentWrongNotification } from "../../components/common/helpers";
import { MantineTheme, useMantineTheme } from "@mantine/core";
import { NextRouter } from "next/router";
import { useServerTierListStore } from "../store/useServerTierListStore";
import { Dispatch, SetStateAction } from "react";
import { parse } from "valibot";

export const useSaveTierListMutation = () => {
  const theme = useMantineTheme();
  const addToCache = useServerTierListStore((state) => state.add);

  return useMutation(handleDiffMetadata, {
    onSuccess: (res, { requestProgress, setRequestProgress, setData, setIsSaving }) => {
      const DONE = 100; //100%

      tween(requestProgress, DONE, 100, (value) => {
        setRequestProgress(value);
        if (value !== DONE) {
          return;
        }
        setTimeout(() => {
          setIsSaving(false);
          setRequestProgress(0);
        }, 1000);
      });

      try {
        let tierListData: TierListData;

        if (typeof res.data === "string") {
          tierListData = parse(TierListSchema, JSON.parse(res.data));
        } else {
          tierListData = res.data;
        }
        addToCache({ uuid: res.id, response: res });
        setData(tierListData);
      } catch (e) {
        console.error(e);
        showSomethingWentWrongNotification(theme);
      } finally {
        setTimeout(() => {
          setIsSaving(false);
          setRequestProgress(0);
        }, 1000);
      }
    },
    onError: (_, { setIsSaving, setRequestProgress }) => {
      setTimeout(() => {
        setIsSaving(false);
        setRequestProgress(0);
        showSomethingWentWrongNotification(theme);
      }, 1000);
    },
  });
};

type HandleDiffMetadataParam = {
  setHideToolbars: (v: boolean) => void;
  diffMetadata: DiffData["metadata"];
  data: TierListData;
  setData: Dispatch<SetStateAction<TierListData>>;
  setIsSaving: Dispatch<SetStateAction<boolean>>;
  requestProgress: number;
  setRequestProgress: (v: number) => void;
  theme: MantineTheme;
  router: NextRouter;
  uuid: string;
};

async function handleDiffMetadata({
  setHideToolbars,
  diffMetadata: { added },
  data,
  requestProgress,
  setRequestProgress,
  theme,
  router,
  uuid,
}: HandleDiffMetadataParam) {
  const payload = { data: JSON.parse(JSON.stringify(data)) as TierListData };

  if (added.length > 0) {
    const formData = await generateFormData({ data, added });
    const res = await upload({ formData, requestProgress, setRequestProgress });
    const srcs = res.data.data;

    for (let i = 0; i < srcs.length; ++i) {
      const metaData = added[i];
      const imgSrc = srcs[i];

      switch (metaData.location) {
        case "sidebar":
          payload.data.sidebar[metaData.index].src = imgSrc;
          break;

        case "row":
          const rowID = metaData.rowID;
          const rowIndex = payload.data.rows.findIndex((row) => row.id === rowID);
          payload.data.rows[rowIndex].items[metaData.index].src = imgSrc;
          break;

        default:
          break;
      }
    }
  }

  const replaceThumbnailFormData = await generateReplaceThumbnailFormData({ router, setHideToolbars, theme });
  await replaceThumbnail({ uuid, formData: replaceThumbnailFormData, requestProgress, setRequestProgress });

  return await saveTierList({ uuid, payload });
}

type GenerateFormDataParam = {
  data: TierListData;
  added: DiffData["metadata"]["added"];
};

async function generateFormData({ data, added }: GenerateFormDataParam) {
  // grab the new images from `data` by using the metadata["added"] info.
  // store it in an array
  let images: any[] = [];

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

type GenerateReplaceThumbnailFormDataParam = {
  theme: MantineTheme;
  setHideToolbars: (v: boolean) => void;
  router: NextRouter;
};
async function generateReplaceThumbnailFormData({
  setHideToolbars,
  theme,
  router,
}: GenerateReplaceThumbnailFormDataParam) {
  let thumbnail: File;

  setHideToolbars(true);
  const div = document.getElementById(DOM_TO_PNG_ID)! as HTMLDivElement;

  try {
    const blob = await DomToImage.toBlob(div);
    const compressed = await compressImage(new File([blob], "blob", { type: "image/jpeg" }), THUMBNAIL_WIDTH);
    thumbnail = compressed;
  } catch (e) {
    showSomethingWentWrongNotification(theme);
    router.push("/");
    console.error(e);
  } finally {
    setHideToolbars(false);
  }

  const fd = new FormData();

  const FORM_DATA_KEY = "thumbnail";

  fd.set(FORM_DATA_KEY, thumbnail!, "thumbnail");

  return fd;
}
