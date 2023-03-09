import { ActionIcon, Group } from "@mantine/core";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandGoogle,
  IconBrandReddit,
  IconBrandTwitter,
} from "@tabler/icons-react";

export const OAuthIconsGroup = () => {
  const icons = [
    <IconBrandGithub />,
    <IconBrandGitlab />,
    <IconBrandGoogle />,
    <IconBrandReddit />,
    <IconBrandDiscord />,
    <IconBrandTwitter />,
  ];

  return (
    <Group>
      {icons.map((icon) => (
        <ActionIcon radius="xl" color="gray" variant="filled">
          {icon}
        </ActionIcon>
      ))}
    </Group>
  );
};
