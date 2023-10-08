import { useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { showSuccessNotification } from "../../components/common/helpers";
import { useAuth } from "../../contexts/AuthProvider";
import { apiClient } from "../../lib/apiClient";
import { queryKeys } from "../../lib/queryKeys";
import { useResetQueries } from "./useResetQueries";

export const useDeleteAccountMutation = () => {
  const { setUser } = useAuth();

  const router = useRouter();
  const theme = useMantineTheme();

  const resetQueries = useResetQueries();

  return useMutation(deleteAccount, {
    onMutate() {
      setUser(null);
      resetQueries(queryKeys.recentTierLists());
      resetQueries(queryKeys.publicTierListsIndex());

      router.push("/");

      showSuccessNotification({
        theme,
        title: "Success",
        message: (
          <>
            Your account is being deleted.
            <br />
            Changes may take a couple minutes.
          </>
        ),
      });
    },
  });
};

async function deleteAccount() {
  const res = await apiClient.delete<void>("/user");
  return res.data;
}
