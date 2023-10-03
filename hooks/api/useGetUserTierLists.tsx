import { useQuery } from "react-query";
import { UserTierListsResponse } from "../../components/tierlist/types";
import { useAuth } from "../../contexts/AuthProvider";
import { apiClient } from "../../lib/apiClient";
import { queryKeys } from "../../lib/queryKeys";

export const useGetUserTierLists = () => {
  const { user } = useAuth();

  const userAvailable = user !== undefined && user !== null;
  const userID = userAvailable ? user.id : "";
  console.log({ userID });

  return useQuery(queryKeys.userTierLists(userID), fetchUserTierLists(userID), {
    enabled: userAvailable,
  });
};

function fetchUserTierLists(userID: string) {
  return async function () {
    const res = await apiClient.get<UserTierListsResponse>(`/user/${userID}/tierlists`);
    return res.data;
  };
}
