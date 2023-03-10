import { ActionIcon, DefaultMantineColor, Group } from "@mantine/core";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandGoogle,
  IconBrandReddit,
  IconBrandTwitter,
} from "@tabler/icons-react";
import { oauthIconSx } from "./styles";

type IconsData = {
  brand: string;
  icon: JSX.Element;
  color: DefaultMantineColor;
};

export const OAuthIconsGroup = () => {
  const icons: IconsData[] = [
    { brand: "Google", icon: <IconBrandGoogle />, color: "cyan" },
    { brand: "Reddit", icon: <IconBrandReddit />, color: "red" },
    { brand: "Discord", icon: <IconBrandDiscord />, color: "violet" },
    { brand: "Twitter", icon: <IconBrandTwitter />, color: "blue" },
    { brand: "Gitlab", icon: <IconBrandGitlab />, color: "orange" },
    { brand: "Github", icon: <IconBrandGithub />, color: "dark" },
  ];

  return (
    <Group>
      {icons.map((data) => (
        <ActionIcon
          key={data.brand}
          radius="xl"
          color={data.color}
          variant="filled"
          sx={oauthIconSx}
        >
          {data.icon}
        </ActionIcon>
      ))}
    </Group>
  );
};
