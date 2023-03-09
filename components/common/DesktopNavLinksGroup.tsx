import { Group } from "@mantine/core";
import { DesktopNavLink } from "./DesktopNavLink";
import { Route } from "./types";

type Props = {
  currentPath: Route;
};

export const DesktopNavLinksGroup = ({ currentPath }: Props) => {
  return (
    <Group>
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
