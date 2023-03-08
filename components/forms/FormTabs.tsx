import { Tabs } from "@mantine/core";
import { IconPhoto, IconSettings } from "@tabler/icons-react";
import { useRouter } from "next/router";

export const FormTabs = () => {
  const router = useRouter();

  return (
    <Tabs
      value={router.pathname}
      onTabChange={(value) => router.push(`${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab value={"/register"} icon={<IconPhoto size="0.8rem" />}>
          Register
        </Tabs.Tab>
        <Tabs.Tab value={"/signin"} icon={<IconSettings size="0.8rem" />}>
          Sign In
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
};
