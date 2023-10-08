import { InfiniteData } from "react-query";
import {
  SaveTierListParam,
  SaveTierListResponse,
  TierListData,
  UserTierListsResponse,
} from "../../components/tierlist/types";
import { apiClient } from "../../lib/apiClient";
import { TierListCacheChangeInfo, UploadResponse } from "./types";

const PRE_POST_REQUEST_MAX_PROGRESS = 53;

const REPLACE_THUMBNAIL_MAX_PROGRESS = 61;

type UploadParam = {
  formData: FormData;
  requestProgress: number;
  setRequestProgress: (v: number) => void;
};

export async function replaceThumbnail({
  uuid,
  formData,
  requestProgress,
  setRequestProgress,
}: UploadParam & { uuid: string }) {
  return await apiClient.post<void>(`/thumbnail/${uuid}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (!e.event.lengthComputable) {
        return;
      }

      const newValue = Math.round((e.event.loaded * REPLACE_THUMBNAIL_MAX_PROGRESS) / e.event.total);

      tween(requestProgress, newValue, 300, (value) => {
        setRequestProgress(value);
      });
    },
  });
}

export async function upload({ formData, requestProgress, setRequestProgress }: UploadParam) {
  return await apiClient.post<UploadResponse>("/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (!e.event.lengthComputable) {
        return;
      }

      // calc upload progress relatively, scale to range(0, PRE_POST_REQUEST_MAX_PROGRESS);
      // ab = cd
      const newValue = Math.round((e.event.loaded * PRE_POST_REQUEST_MAX_PROGRESS) / e.event.total);

      tween(requestProgress, newValue, 300, (value) => {
        setRequestProgress(value);
      });
    },
  });
}

type _SaveTierListParam = {
  uuid: string;
  payload: { data: TierListData };
};

export async function saveTierList({ uuid, payload }: _SaveTierListParam) {
  const res = await apiClient.put<SaveTierListResponse>(`/tierlist/${uuid}`, payload);
  return res.data;
}

export function tween(startValue: number, endValue: number, duration: number, callback: (value: number) => void): void {
  const frameRate = 60; // Assuming 60 frames per second
  const totalFrames = (duration / 1000) * frameRate; // Calculate the total number of frames
  let currentFrame = 0;

  function update() {
    if (currentFrame <= totalFrames) {
      const progress = currentFrame / totalFrames;
      const interpolatedValue = startValue + (endValue - startValue) * progress;
      callback(interpolatedValue);
      currentFrame++;
      requestAnimationFrame(update);
    } else {
      callback(endValue);
    }
  }

  update();
}

export const getTierListDataFromCache = ({
  cacheData,
  tierListID,
}: {
  cacheData: InfiniteData<UserTierListsResponse>;
  tierListID: string;
}): TierListCacheChangeInfo | void => {
  for (let i = 0; i < cacheData.pages.length; ++i) {
    const page = cacheData.pages[i];

    for (let j = 0; j < page.data.length; ++j) {
      const tierList = page.data[j];

      if (tierList.id === tierListID) {
        return { tierList, pageIndex: i, tierListIndex: j };
      }
    }
  }
};

export async function createTierListRequest({ payload, requestProgress, setRequestProgress }: SaveTierListParam) {
  const res = await apiClient.post<SaveTierListResponse>("/tierlist", payload);
  return { response: res.data, requestProgress, setRequestProgress };
}
