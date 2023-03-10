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
    { brand: "Github", icon: <IconBrandGithub /> },
    { brand: "Gitlab", icon: <IconBrandGitlab /> },
    { brand: "Google", icon: <IconBrandGoogle /> },
    { brand: "Reddit", icon: <IconBrandReddit /> },
    { brand: "Discord", icon: <IconBrandDiscord /> },
    { brand: "Twitter", icon: <IconBrandTwitter /> },
  ];

  return (
    <Group>
      {icons.map((data) => (
        <ActionIcon key={data.brand} radius="xl" color="gray" variant="filled">
          {data.icon}
        </ActionIcon>
      ))}
    </Group>
  );
};
