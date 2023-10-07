import { Center, Loader, MantineTheme, Text, useMantineTheme } from "@mantine/core";

const bigSpacing = ({ spacing }: MantineTheme) => `calc(${spacing.xl} + ${spacing.lg})`;

export const InfiniteScrollLoading = () => {
  const theme = useMantineTheme();

  return (
    <Center mt={bigSpacing(theme)} mb={bigSpacing(theme)}>
      <Loader size="xl" variant="bars" />
      <Text ml="xl" color="gray.0" size="xl" weight="bold">
        Loading...
      </Text>
    </Center>
  );
};
