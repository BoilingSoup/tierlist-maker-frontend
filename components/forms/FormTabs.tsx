import { Tabs } from "@mantine/core";
import { IconPencil, IconUserPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";

export const FormTabs = () => {
  const router = useRouter();

  return (
    <Tabs
      value={router.pathname}
      onTabChange={(value) => router.push(`${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab value={"/register"} icon={<IconUserPlus size="0.8rem" />}>
          Register
        </Tabs.Tab>
        <Tabs.Tab value={"/signin"} icon={<IconPencil size="0.8rem" />}>
          Sign In
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
