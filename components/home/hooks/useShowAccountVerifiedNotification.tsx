import { MantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { showSuccessNotification } from "../../common/helpers";

export const useShowAccountVerifiedNotification = (theme: MantineTheme) => {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (window.location.href.includes("?verified=1") && !shown) {
      showSuccessNotification({
        theme,
        title: "Verified",
        message: "Your account has been verified.",
      });
      setShown(true);
    }
  }, [theme, shown]);
};
