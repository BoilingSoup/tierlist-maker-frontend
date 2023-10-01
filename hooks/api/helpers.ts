import { apiClient } from "../../lib/apiClient";
import { UploadResponse } from "./types";

const PRE_POST_REQUEST_MAX_PROGRESS = 53;

type UploadParam = {
  formData: FormData;
  requestProgress: number;
  setRequestProgress: (v: number) => void;
};

export async function upload({ formData, requestProgress, setRequestProgress }: UploadParam) {
  return await apiClient.post<UploadResponse>("/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (!e.event.lengthComputable) {
        return;
      }

      const newValue = Math.round((e.event.loaded * PRE_POST_REQUEST_MAX_PROGRESS) / e.event.total); // ab = cd

      tween(requestProgress, newValue, 300, (value) => {
        setRequestProgress(value);
      });
    },
  });
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
