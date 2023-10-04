import { Box, Button, Flex, Image, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { forwardRef } from "react";
import { tierListCardContainerSx } from "./styles";
import { UserTierListsResponse } from "./types";

type Props = {
  tierList: UserTierListsResponse["data"][number];
};

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
        value={tierList.title}
        readOnly
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
            <Button component={Link} href={`/tierlist/${tierList.id}`} w="100%" color="gray.8">
              View
            </Button>
            <Button color="gray.7">Edit Info</Button>
          </Stack>
        </Flex>
        {tierList.description && (
          <Text sx={(theme) => ({ marginTop: theme.spacing.md, overflow: "hidden", textOverflow: "ellipsis" })}>
            <strong style={{ textDecoration: "underline" }}>Description</strong>
            <br />
            {tierList.description}
          </Text>
        )}
      </Box>
    </Box>
  );
});

TierListCard.displayName = "TierListCard";
