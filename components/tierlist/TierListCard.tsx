import { Box, Button, Flex, Image, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import { IconDeviceFloppy, IconEye, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { forwardRef, useReducer, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { capitalizeSentences, titleCase } from "./helpers";
import {
  tierListCardButtonsContainerSx,
  tierListCardButtonSx,
  tierListCardContainerSx,
  tierListCardDescriptionSx,
  tierListCardImageContainerSx,
  tierListCardImageSx,
} from "./styles";
import { UserTierListsResponse } from "./types";

type Props = {
  tierList: UserTierListsResponse["data"][number];
};

export const TierListCard = forwardRef<HTMLDivElement, Props>(({ tierList }, observerRef) => {
  const { user } = useAuth();
  const theme = useMantineTheme();

  const [isEditing, toggle] = useReducer((prev) => !prev, false);

  const handleCancel = () => {
    toggle();
  };

  const handleDelete = () => {
    toggle();
  };

  const handleSave = () => {
    toggle();
  };

  return (
    <Box ref={observerRef} sx={tierListCardContainerSx(isEditing)}>
      <TextInput
        value={titleCase(tierList.title)}
        disabled={!isEditing}
        styles={{
          input: {
            color: "white",
            background: theme.colors.dark[4],
            fontSize: theme.fontSizes.xl,
            padding: `${theme.spacing.lg} 0 ${theme.spacing.lg} ${theme.spacing.lg}`,
            fontWeight: "bold",
            height: "40px",
            ":disabled": {
              color: "white",
              background: theme.colors.dark[6],
              border: "none",
              cursor: "initial",
            },
          },
        }}
      />
      <Box sx={{ height: "100%", margin: `0 ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.lg}` }}>
        <Flex sx={(theme) => ({ alignItems: "center", gap: theme.spacing.lg })}>
          <Box sx={tierListCardImageContainerSx}>
            <Image src={tierList.thumbnail} sx={tierListCardImageSx} />
          </Box>
          <Stack sx={tierListCardButtonsContainerSx}>
            {isEditing ? (
              <>
                <Button onClick={handleSave} color="blue.8" leftIcon={<IconDeviceFloppy />} sx={tierListCardButtonSx}>
                  Save
                </Button>
                <Button onClick={handleCancel} color="gray.8" leftIcon={<IconX />} sx={tierListCardButtonSx}>
                  Cancel
                </Button>
                <Button onClick={handleDelete} color="red.8" leftIcon={<IconTrash />} sx={tierListCardButtonSx}>
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button onClick={toggle} color="gray.8" leftIcon={<IconPencil />} sx={tierListCardButtonSx}>
                  Edit
                </Button>
                <Button
                  component={Link}
                  href={`/tierlist/${tierList.id}`}
                  color="gray.8"
                  leftIcon={<IconEye />}
                  sx={tierListCardButtonSx}
                >
                  View
                </Button>
              </>
            )}
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
