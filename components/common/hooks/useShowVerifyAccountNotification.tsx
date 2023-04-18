import { useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { showInfoNotification } from "../helpers";

type Param = {
  condition: boolean;
};

export const useShowVerifyAccountNotification = ({ condition }: Param) => {
  const { user } = useAuth();
  const theme = useMantineTheme();

  useEffect(() => {
    if (condition) {
      showInfoNotification({
        theme,
        title: "Verify Account",
        message: `Please verify your account with the email sent to ${user?.email}`,
      });
    }
  }, []);
};
