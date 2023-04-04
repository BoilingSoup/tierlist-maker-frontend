import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Route } from "../types";

export const useCurrentPath = () => {
  const { pathname } = useRouter();
  const [currentPath, setCurrentPath] = useState<Route>(Route.None);

  useEffect(() => {
    switch (pathname) {
      case "/": {
        setCurrentPath(Route.Home);
        break;
      }
      case "/create": {
        setCurrentPath(Route.Create);
        break;
      }
      case "/browse": {
        setCurrentPath(Route.Browse);
        break;
      }
      case "/register": {
        setCurrentPath(Route.Register);
        break;
      }
      case "/signin": {
        setCurrentPath(Route.SignIn);
        break;
      }
      case "/account": {
        setCurrentPath(Route.Account);
        break;
      }
      default: {
        setCurrentPath(Route.None);
      }
    }
  }, [pathname, currentPath]);

  return currentPath;
};
