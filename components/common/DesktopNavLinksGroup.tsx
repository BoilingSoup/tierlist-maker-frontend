import { Group } from "@mantine/core";
import { useAuth } from "../../contexts/AuthProvider";
import { useSignOutMutation } from "../../hooks/api/useSignOutMutation";
import { DesktopNavLink } from "./DesktopNavLink";
import { Route } from "./types";

type Props = {
  currentPath: Route;

  /* className is automatically passed by MediaQuery component */
  className?: string;
};

export const DesktopNavLinksGroup = ({ currentPath, className }: Props) => {
  const { user, setUser, isLoading } = useAuth();
  const { mutate: signOut, isLoading: isSigningOut } = useSignOutMutation();

  return (
    <Group className={className}>
      <DesktopNavLink
        href="/"
        text="Home"
        isCurrentPath={currentPath === Route.Home}
      />
      <DesktopNavLink
        href="/browse"
        text="Browse"
        isCurrentPath={currentPath === Route.Browse}
      />
      <DesktopNavLink
        href="/create"
        text="Create"
        isCurrentPath={currentPath === Route.Create}
      />
      {isLoading || !user ? (
        <>
          <DesktopNavLink
            href={"/register"}
            text="Register"
            isCurrentPath={currentPath === Route.Register}
            isLoading={isLoading}
          />
          <DesktopNavLink
            href="/signin"
            text="Sign In"
            isCurrentPath={currentPath === Route.SignIn}
            isLoading={isLoading}
          />
        </>
      ) : (
        <>
          <DesktopNavLink
            href={"/account"}
            text="Account"
            isCurrentPath={currentPath === Route.Account}
            isLoading={isLoading}
          />
          <DesktopNavLink
            text="Sign Out"
            isLoading={isSigningOut}
            onClick={signOut}
          />
        </>
      )}
    </Group>
  );
};
