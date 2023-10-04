import { Box, Button, Flex, Image, Stack, TextInput, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { forwardRef } from "react";
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
  //
  //
  // TODO: disable create modal submit when title or description is too long
  //   - this is in useCreateTierListSomething... just writing it here because I encountered it while testing.
  return (
    <Box
      ref={observerRef}
      sx={(theme) => ({
        width: "90%",
        maxWidth: "600px",
        // height: "300px",
        background: theme.colors.dark[6],
        borderRadius: theme.radius.sm,
        transition: "transform 100ms ease",
        ":hover": {
          transform: "scale(1.02)",
        },
      })}
    >
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
            {/* <Button color="gray.8">Copy</Button> */}
            <Button color="gray.7">Edit Info</Button>
          </Stack>
        </Flex>
        {tierList.description && (
          <p>
            <strong style={{ textDecoration: "underline" }}>Description</strong>
            <br />
            {tierList.description}
          </p>
        )}
      </Box>
    </Box>
  );
});

TierListCard.displayName = "TierListCard";
