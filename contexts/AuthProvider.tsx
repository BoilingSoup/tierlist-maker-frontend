import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { useQuery } from "react-query";
import { authClient } from "../lib/apiClient";
import { queryKeys } from "../lib/queryKeys";

export type User = {
  id: string;
  username: string;
  is_admin: boolean;
} | null;

type UserContext = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  isLoading: boolean;
};

const AuthContext = createContext<UserContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>(null);
  const { isLoading } = useQuery(queryKeys.user(), fetchUser, {
    onSuccess: (user) => {
      setUser(user);
    },
  });

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const fetchUser = async () => {
  const res = await authClient.get<User>("/user");
  return res.data;
};
