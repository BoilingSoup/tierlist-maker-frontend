import { Box, Button, Flex, Image, Stack, Textarea, TextInput, useMantineTheme } from "@mantine/core";
import { IconDeviceFloppy, IconEye, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { forwardRef, useReducer, useRef } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { capitalizeSentences, titleCase } from "./helpers";
import { useCenterThumbnailIfSmall } from "./hooks/useCenterThumbnailIfSmall";
import {
  tierListCardButtonsContainerSx,
  tierListCardButtonSx,
  tierListCardContainerSx,
  getTierListCardDescriptionStyles,
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

  const mantineImageRootRef = useRef<HTMLDivElement>(null);
  useCenterThumbnailIfSmall({ ref: mantineImageRootRef, tierList });

  return (
    <Box ref={observerRef} sx={tierListCardContainerSx(isEditing)}>
      <TextInput
        value={titleCase(tierList.title)}
        disabled={!isEditing}
        styles={{
          input: {
            color: "white",
            width: `calc(100% - ${theme.spacing.lg} - ${theme.spacing.lg})`,
            background: theme.colors.dark[4],
            fontSize: theme.fontSizes.xl,
            padding: `${theme.spacing.lg} 0 ${theme.spacing.lg} ${theme.spacing.lg}`,
            fontWeight: "bold",
            height: "40px",
            margin: theme.spacing.lg,
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
            <Image ref={mantineImageRootRef} src={tierList.thumbnail} sx={tierListCardImageSx} />
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
          <Textarea
            c="dimmed"
            disabled={!isEditing}
            styles={getTierListCardDescriptionStyles(theme)}
            value={capitalizeSentences(tierList.description)}
          />
        )}
      </Box>
    </Box>
  );
});

TierListCard.displayName = "TierListCard";
