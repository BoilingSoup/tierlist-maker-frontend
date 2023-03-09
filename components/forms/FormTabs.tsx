import { Tabs, useMantineTheme } from "@mantine/core";
import { IconPencil, IconUserPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";

export const FormTabs = () => {
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <Tabs
      value={router.pathname}
      onTabChange={(value) => router.push(`${value}`)}
      styles={{
        tab: {
          color: theme.colors.dark[3],
        },
      }}
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
