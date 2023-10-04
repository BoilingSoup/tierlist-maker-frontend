import { Box, Button, Flex, Image, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import { IconEye, IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import { forwardRef } from "react";
import { tierListCardContainerSx, tierListCardDescriptionSx } from "./styles";
import { UserTierListsResponse } from "./types";

type Props = {
  tierList: UserTierListsResponse["data"][number];
};

function titleCase(title: string): string {
  const words = title.split(" ");
  const capitalized = words.map((word) => word[0].toUpperCase() + word.slice(1));
  return capitalized.join(" ");
}

function capitalizeSentences(text: string): string {
  const punctuationRegex = new RegExp(/[.|!|?]/);

  const sentences = text.split(punctuationRegex);
  const capitalizedArr = sentences.map((sentence) => sentence[0].toUpperCase() + sentence.slice(1));
  const capitalizedStr = capitalizedArr.join(" ");

  const lastCharIsPunctuation = punctuationRegex.test(capitalizedStr[capitalizedStr.length - 1]);

  return lastCharIsPunctuation ? capitalizedStr : capitalizedStr + ".";
}

export const TierListCard = forwardRef<HTMLDivElement, Props>(({ tierList }, observerRef) => {
  const theme = useMantineTheme();

  // TODO: tierListResponse should return user_id
  // if user_id === useAuth user.id
  // show edit forms, delete, etc.
  //  - reuse in browse page
  //
  return (
    <Box ref={observerRef} sx={tierListCardContainerSx}>
      <TextInput
        value={titleCase(tierList.title)}
        styles={{
          input: {
            color: "white",
            background: theme.colors.dark[6],
            border: "none",
            fontSize: theme.fontSizes.xl,
            padding: `${theme.spacing.lg} 0 0 ${theme.spacing.lg}`,
            fontWeight: "bold",
            height: "40px",
          },
        }}
      />
      <Box sx={{ height: "100%", margin: theme.spacing.lg }}>
        <Flex sx={(theme) => ({ alignItems: "center", gap: theme.spacing.lg })}>
          <Box
            sx={{
              width: "300px",
              height: "200px",
              minWidth: "300px", // child image with objectFit: contain is effecting size unless I explicitly set min/max dimensions
              minHeight: "200px",
              maxWidth: "300px",
              maxHeight: "200px",
              overflow: "hidden",
            }}
          >
            <Image src={tierList.thumbnail} sx={{ width: "300px", height: "200px", objectFit: "contain" }} />
          </Box>
          <Stack w="100%" h="200px" sx={{ gap: theme.spacing.sm, justifyContent: "center" }}>
            <Button
              component={Link}
              href={`/tierlist/${tierList.id}`}
              color="gray.8"
              leftIcon={<IconEye />}
              sx={(theme) => ({
                ":hover": {
                  backgroundColor: theme.colors.dark[3],
                },
              })}
            >
              View
            </Button>
            <Button
              color="gray.7"
              leftIcon={<IconPencil />}
              sx={(theme) => ({
                ":hover": {
                  backgroundColor: theme.colors.dark[3],
                },
              })}
            >
              Edit
            </Button>
          </Stack>
        </Flex>
        {tierList.description && (
          <Text c="dimmed" sx={tierListCardDescriptionSx}>
            {capitalizeSentences(tierList.description)}
          </Text>
        )}
      </Box>
    </Box>
  );
});

TierListCard.displayName = "TierListCard";
