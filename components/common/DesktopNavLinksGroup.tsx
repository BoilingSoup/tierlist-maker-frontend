import { Group } from "@mantine/core";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthProvider";
import { useSignOutMutation } from "../../hooks/api/useSignOutMutation";
import { DesktopNavLink } from "./DesktopNavLink";

type Props = {
  /* className is automatically passed by MediaQuery component */
  className?: string;
};

export const DesktopNavLinksGroup = ({ className }: Props) => {
  const { user, isLoading } = useAuth();
  const { mutate: signOut, isLoading: isSigningOut } = useSignOutMutation();
  const { pathname } = useRouter();

  return (
    <Group className={className}>
      <DesktopNavLink href="/" text="Home" isCurrentPath={pathname === "/"} />
      <DesktopNavLink
        href="/browse"
        text="Browse"
        isCurrentPath={pathname === "/browse"}
      />
      <DesktopNavLink
        href="/create"
        text="Create"
        isCurrentPath={pathname === "/create"}
      />
      {isLoading || !user ? (
        <>
          <DesktopNavLink
            href={"/register"}
            text="Register"
            isCurrentPath={pathname === "/register"}
            isLoading={isLoading}
          />
          <DesktopNavLink
            href="/signin"
            text="Sign In"
            isCurrentPath={pathname === "/signin"}
            isLoading={isLoading}
          />
        </>
      ) : (
        <>
          <DesktopNavLink
            href={"/account/tierlists"}
            text="Account"
            isCurrentPath={
              pathname === "/account/tierlists" ||
              pathname === "/account/settings"
            }
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
