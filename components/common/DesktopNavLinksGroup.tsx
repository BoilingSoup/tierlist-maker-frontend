import { Group } from "@mantine/core";
import { DesktopNavLink } from "./DesktopNavLink";
import { Route } from "./types";

type Props = {
  currentPath: Route;

  /* className is automatically passed by MediaQuery component */
  className?: string;
};

export const DesktopNavLinksGroup = ({ currentPath, className }: Props) => {
  return (
    <Group className={className}>
      <DesktopNavLink
        href="/browse"
        text="Browse"
        isCurrentPath={currentPath === Route.Browse}
      />
      <DesktopNavLink
        href="/register"
        text="Register"
        isCurrentPath={currentPath === Route.Register}
      />
      <DesktopNavLink
        href="/signin"
        text="Sign In"
        isCurrentPath={currentPath === Route.SignIn}
      />
    </Group>
  );
};
