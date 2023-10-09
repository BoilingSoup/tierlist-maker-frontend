import { Center, Text } from "@mantine/core";

export const IsOwnerTag = () => {
  return (
    <Center
      pos="absolute"
      sx={(theme) => ({
        left: -25,
        top: 13,
        background: theme.colors.cyan[4],
        rotate: "-45deg",
        paddingLeft: theme.spacing.xl,
        paddingRight: theme.spacing.xl,
        fontWeight: "bold",
        color: "white",
      })}
    >
      <Text>Yours</Text>
    </Center>
  );
};
