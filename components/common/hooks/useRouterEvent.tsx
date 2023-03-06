import { useRouter } from "next/router";
import { useEffect } from "react";

type Param = {
  on:
    | "routeChangeStart"
    | "beforeHistoryChange"
    | "routeChangeComplete"
    | "routeChangeError"
    | "hashChangeStart"
    | "hashChangeComplete";
  handler: () => void;
};

export const useRouterEvent = ({ on, handler }: Param) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on(on, handler);

    // return func cleans up event listener when component unmounts to avoid memory leaks
    return () => {
      router.events.off(on, handler);
    };
  }, []);
};
