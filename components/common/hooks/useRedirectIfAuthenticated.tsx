import { useRouter } from "next/router";
import { User } from "../../../contexts/AuthProvider";

type Param = {
  user: User;
  isLoading: boolean;
  redirectTo: string;
};

export const useRedirectIfAuthenticated = ({ user, isLoading, redirectTo }: Param) => {
  const router = useRouter();

  if (!isLoading && !!user) {
    router.push(redirectTo);
  }
};
