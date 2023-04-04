import { useMutation } from "react-query";
import { showSomethingWentWrongNotification } from "../../components/common/helpers";
import { useAuth } from "../../contexts/AuthProvider";
import { authClient } from "../../lib/apiClient";

export const useSignOutMutation = () => {
  const { setUser } = useAuth();

  return useMutation(attemptSignOut, {
    onSuccess: () => {
      setUser(null);
    },
    onError: () => {
      showSomethingWentWrongNotification();
    },
  });
};

const attemptSignOut = async () => {
  const res = await authClient.post("/logout");
  return res.data;
};
