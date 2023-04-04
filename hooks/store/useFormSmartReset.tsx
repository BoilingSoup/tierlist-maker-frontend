import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRegisterFormStore } from "./useRegisterFormStore";
import { useSignInFormStore } from "./useSignInFormStore";

export const useFormSmartReset = () => {
  const router = useRouter();
  const resetRegisterForm = useRegisterFormStore((state) => state.reset);
  const resetSignInForm = useSignInFormStore((state) => state.reset);

  useEffect(() => {
    router.events.on("routeChangeComplete", (url) => {
      if (url !== "/signin" && url !== "/register") {
        resetRegisterForm();
        resetSignInForm();
      }
    });
  }, []);
};
