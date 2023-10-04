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
import { queryKeys } from "../../lib/queryKeys";
import { useAuth } from "../../contexts/AuthProvider";
import { useRefetchQueries } from "./useRefetchQueries";
import { useResetQueries } from "./useResetQueries";

const DONE = 100; //100%

export const useSaveTierListMutation = () => {
  const { user } = useAuth();
  const theme = useMantineTheme();
  const addToCache = useServerTierListStore((state) => state.add);

  const userID = user ? user.id : "";

  const refetchQueries = useRefetchQueries();
  const resetQueries = useResetQueries();

  return useMutation(handleDiffMetadata, {
    onSuccess: (res, { requestProgress, setRequestProgress, setData }) => {
      const duration = 80; //ms
      tween(requestProgress, DONE, duration, (value) => {
        setRequestProgress(value);
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
      }
    },
    onError: (_, { setIsSaving, setRequestProgress }) => {
      setTimeout(() => {
        setIsSaving(false);
        setRequestProgress(0);
        showSomethingWentWrongNotification(theme);
      }, 500);
    },
    onSettled: (_, __, { setIsSaving, setRequestProgress }) => {
      resetQueries(queryKeys.userTierLists(userID));
      refetchQueries(queryKeys.userTierLists(userID));

      setTimeout(() => {
        setIsSaving(false);
        setRequestProgress(0);
      }, 500);
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
  setRequestProgress: Dispatch<SetStateAction<number>>;
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
  let payload = { data: JSON.parse(JSON.stringify(data)) as TierListData };

  if (added.length > 0) {
    console.log("uploading");
    const srcs = await uploadNewImages({ data, added, requestProgress, setRequestProgress });

    payload = replacePayloadSrcs({ payload, added, srcs });
  }

  await overwriteNewThumbnail({ theme, router, uuid, requestProgress, setRequestProgress, setHideToolbars });

  return await saveTierList({ uuid, payload });
}

type UploadNewImagesParam = {
  data: TierListData;
  added: DiffData["metadata"]["added"];
  requestProgress: number;
  setRequestProgress: Dispatch<SetStateAction<number>>;
};

async function uploadNewImages({
  data,
  added,
  requestProgress,
  setRequestProgress,
}: UploadNewImagesParam): Promise<string[]> {
  const formData = await generateFormData({ data, added });
  const res = await upload({ formData, requestProgress, setRequestProgress });
  const srcs = res.data.data;

  return srcs;
}

type ReplacePayloadSrcsParam = {
  srcs: string[];
  payload: { data: TierListData };
  added: DiffData["metadata"]["added"];
};

function replacePayloadSrcs({ srcs, payload, added }: ReplacePayloadSrcsParam) {
  const copy = JSON.parse(JSON.stringify(payload)) as ReplacePayloadSrcsParam["payload"];

  for (let i = 0; i < srcs.length; ++i) {
    const metaData = added[i];
    const imgSrc = srcs[i];

    switch (metaData.location) {
      case "sidebar":
        copy.data.sidebar[metaData.index].src = imgSrc;
        break;

      case "row":
        const rowID = metaData.rowID;
        const rowIndex = copy.data.rows.findIndex((row) => row.id === rowID);
        copy.data.rows[rowIndex].items[metaData.index].src = imgSrc;
        break;

      default:
        break;
    }
  }

  return copy;
}

type OverwriteNewThumbnailParam = {
  router: NextRouter;
  setHideToolbars: (v: boolean) => void;
  theme: MantineTheme;
  uuid: string;
  requestProgress: number;
  setRequestProgress: Dispatch<SetStateAction<number>>;
};

async function overwriteNewThumbnail({
  router,
  theme,
  setHideToolbars,
  uuid,
  requestProgress,
  setRequestProgress,
}: OverwriteNewThumbnailParam) {
  const replaceThumbnailFormData = await generateReplaceThumbnailFormData({ router, setHideToolbars, theme });
  await replaceThumbnail({ uuid, formData: replaceThumbnailFormData, requestProgress, setRequestProgress });
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
