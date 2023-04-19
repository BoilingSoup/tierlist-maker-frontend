import { useRouter } from "next/router";

export const useQueryParams = (params: string[]) => {
  const router = useRouter();
  const paramsObj: Record<string, string> = {};

  params.forEach((param) => {
    const routerVal = router.query[param];
    if (typeof routerVal === "string") {
      paramsObj[param] = routerVal;
    }
  });

  return paramsObj;
};
