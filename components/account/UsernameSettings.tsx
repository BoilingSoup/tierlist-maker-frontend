import {
  ActionIcon,
  Flex,
  MantineTheme,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useAuth, User } from "../../contexts/AuthProvider";

type Props = {
  skeleton?: boolean;
};

export const UsernameSettings = ({ skeleton }: Props) => {
  const { user, setUser, isLoading } = useAuth();
  const theme = useMantineTheme();

  return (
    <Flex
      sx={(theme: MantineTheme) => ({
        justifyContent: "space-between",
        width: "500px",
        margin: `${theme.spacing.xl} auto`,
        // outline: "2px solid red",
      })}
    >
      <TextInput
        label="Username"
        styles={{
          label: {
            color: "white",
            display: "inline-block",
            width: "200px",
            fontSize: "1rem",
            marginRight: "3rem",
          },
          wrapper: {
            display: "inline-block",
          },
          input: {
            width: "180px",
            padding: 0,
            border: "none",
            ":disabled": {
              background: theme.colors.dark[7],
              cursor: "default",
            },
          },
        }}
        disabled
        placeholder={"bobby123"}
        mr="md"
      />
      <ActionIcon>
        <IconPencil />
      </ActionIcon>
    </Flex>
  );
};
