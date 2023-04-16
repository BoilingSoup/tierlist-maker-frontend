import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { useQuery } from "react-query";
import { apiClient } from "../lib/apiClient";
import { queryKeys } from "../lib/queryKeys";

export type User =
  | {
      id: string;
      username: string;
      email: string;
      is_admin: boolean;
      email_verified: boolean;
      oauth_provider: null;
    }
  | {
      id: string;
      username: string;
      email: null;
      is_admin: boolean;
      email_verified: boolean;
      oauth_provider: "GITHUB" | "GITLAB" | "DISCORD" | "GOOGLE" | "REDDIT";
    }
  | null;

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

export type UserDataServerResponse = {
  data: User;
};

const fetchUser = async () => {
  const res = await apiClient.get<UserDataServerResponse>("/user");
  return res.data.data;
};
