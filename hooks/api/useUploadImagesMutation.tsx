import { useMutation } from "react-query";
import { apiClient } from "../../lib/apiClient";

export const useUploadImagesMutation = () => {
  return useMutation(uploadImages, {
    onSuccess: (data) => {
      console.log("100%");
      console.log(data);

      // reconstruct obj for POST request
    },
  });
};

type UploadResponse = {
  data: string[];
};

async function uploadImages(data: FormData) {
  const res = await apiClient.post<UploadResponse>("/image", data, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (!e.event.lengthComputable) {
        return;
      }

      console.log(`${Math.min(Math.round((e.event.loaded / e.event.total) * 100), 94)}%`);
    },
  });

  return res.data;
}
