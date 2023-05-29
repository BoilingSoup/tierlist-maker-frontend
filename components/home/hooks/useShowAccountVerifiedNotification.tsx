import { MantineTheme } from "@mantine/core";
import { useEffect } from "react";
import { showSuccessNotification } from "../../common/helpers";

export const useShowAccountVerifiedNotification = (theme: MantineTheme) => {
  useEffect(() => {
    if (window.location.href.includes("?verified=1")) {
      showSuccessNotification({
        theme,
        title: "Verified",
        message: "Your account has been verified.",
      });
    }
  }, [theme]);
};
