import { ActionIcon, DefaultMantineColor, Group } from "@mantine/core";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandGoogle,
  IconBrandReddit,
} from "@tabler/icons-react";
import {
  OAuthHref,
  OAUTH_DISCORD_REDIRECT,
  OAUTH_GITHUB_REDIRECT,
  OAUTH_GITLAB_REDIRECT,
  OAUTH_GOOGLE_REDIRECT,
  OAUTH_REDDIT_REDIRECT,
} from "../../config/config";
import { oauthIconSx } from "./styles";

export const OAuthIconsGroup = () => {
  return (
    <Group>
      {icons.map((data) => (
        <ActionIcon
          component="a"
          href={data.href}
          key={data.brand}
          radius="xl"
          color={data.color}
          variant="filled"
          sx={oauthIconSx}
          aria-label={`Sign in with ${data.brand}`}
        >
          {data.icon}
        </ActionIcon>
      ))}
    </Group>
  );
};

type IconsData = {
  brand: string;
  icon: JSX.Element;
  color: DefaultMantineColor;
  href: OAuthHref;
};

const icons: IconsData[] = [
  {
    brand: "Google",
    icon: <IconBrandGoogle />,
    color: "cyan",
    href: OAUTH_GOOGLE_REDIRECT,
  },
  {
    brand: "Reddit",
    icon: <IconBrandReddit />,
    color: "red",
    href: OAUTH_REDDIT_REDIRECT,
  },
  {
    brand: "Discord",
    icon: <IconBrandDiscord />,
    color: "violet",
    href: OAUTH_DISCORD_REDIRECT,
  },
  {
    brand: "GitLab",
    icon: <IconBrandGitlab />,
    color: "orange",
    href: OAUTH_GITLAB_REDIRECT,
  },
  {
    brand: "GitHub",
    icon: <IconBrandGithub />,
    color: "dark",
    href: OAUTH_GITHUB_REDIRECT,
  },
];
