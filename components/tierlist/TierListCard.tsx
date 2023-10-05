import { Box, Button, Flex, Image, Stack, Text, Textarea, TextInput, useMantineTheme } from "@mantine/core";
import { IconDeviceFloppy, IconEye, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { forwardRef, useReducer, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { capitalizeSentences, lastCharIsPunctuation, titleCase } from "./helpers";
import { useCenterThumbnailIfSmall } from "./hooks/useCenterThumbnailIfSmall";
import {
  tierListCardButtonsContainerSx,
  tierListCardContainerSx,
  getTierListCardDescriptionStyles,
  tierListCardImageContainerSx,
  tierListCardImageSx,
  grayButtonHoverSx,
} from "./styles";
import { UserTierListsResponse } from "./types";

type Props = {
  tierList: UserTierListsResponse["data"][number];
};

const titleMaxLength = 80;
const descriptionMaxLength = 100;

export const TierListCard = forwardRef<HTMLDivElement, Props>(({ tierList }, observerRef) => {
  const { user } = useAuth();
  const theme = useMantineTheme();

  const [isEditing, toggle] = useReducer((prev) => !prev, false);

  const [title, setTitle] = useState(tierList.title);
  const titleIsError = title.length > titleMaxLength;

  const [description, setDescription] = useState(tierList.description ? capitalizeSentences(tierList.description) : "");
  const descriptionIsError = lastCharIsPunctuation(description)
    ? description.length > descriptionMaxLength + 1 // frontend adds (.) if no punctuation at end. (.) is not saved in database.
    : description.length > descriptionMaxLength;

  const hasErrors = titleIsError || descriptionIsError;

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleCancel = () => {
    setTitle(tierList.title);
    setDescription(tierList.description ? capitalizeSentences(tierList.description) : "");
    toggle();
  };

  const handleDelete = () => {
    toggle();
  };

  const handleShowDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleSave = () => {
    toggle();
  };

  const mantineImageRootRef = useRef<HTMLDivElement>(null);
  useCenterThumbnailIfSmall({ ref: mantineImageRootRef, tierList });

  return (
    <Box ref={observerRef} sx={tierListCardContainerSx(isEditing)}>
      <TextInput
        value={titleCase(title)}
        disabled={!isEditing}
        styles={{
          input: {
            color: "white",
            width: `calc(100% - ${theme.spacing.lg} - ${theme.spacing.lg})`,
            background: theme.colors.dark[4],
            fontSize: theme.fontSizes.xl,
            fontWeight: "bold",
            height: "40px",
            textAlign: "center",
            margin: theme.spacing.lg,
            ":disabled": {
              color: "white",
              background: theme.colors.dark[6],
              border: "none",
              cursor: "initial",
              padding: 0,
            },
          },
        }}
        onChange={(e) => setTitle(e.target.value)}
        error={titleIsError}
      />
      <Box sx={{ height: "100%", margin: `0 ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.lg}` }}>
        <Flex sx={(theme) => ({ alignItems: "center", gap: theme.spacing.lg })}>
          <Box sx={tierListCardImageContainerSx}>
            <Image ref={mantineImageRootRef} src={tierList.thumbnail} sx={tierListCardImageSx} />
          </Box>
          <Stack sx={tierListCardButtonsContainerSx}>
            {showDeleteConfirmation ? (
              <>
                <Text color="white">
                  This can not be undone. <br />
                  Are you sure?
                </Text>
                <Flex gap={"sm"}>
                  <Button w="50%" color="gray.7" onClick={() => setShowDeleteConfirmation(false)}>
                    No
                  </Button>
                  <Button w="50%" color="red.8">
                    Yes
                  </Button>
                </Flex>
              </>
            ) : isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  color="blue.8"
                  leftIcon={<IconDeviceFloppy />}
                  disabled={hasErrors}
                  sx={{ ":disabled": { background: theme.colors.dark[8] } }}
                >
                  Save
                </Button>
                <Button onClick={handleCancel} color="gray.8" leftIcon={<IconX />} sx={grayButtonHoverSx}>
                  Cancel
                </Button>
                <Button onClick={handleShowDeleteConfirmation} color="red.8" leftIcon={<IconTrash />}>
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button onClick={toggle} color="gray.8" leftIcon={<IconPencil />} sx={grayButtonHoverSx}>
                  Edit
                </Button>
                <Button
                  component={Link}
                  href={`/tierlist/${tierList.id}`}
                  color="gray.8"
                  leftIcon={<IconEye />}
                  sx={grayButtonHoverSx}
                >
                  View
                </Button>
              </>
            )}
          </Stack>
        </Flex>
        {(tierList.description || isEditing) && (
          <Textarea
            c="dimmed"
            disabled={!isEditing}
            styles={getTierListCardDescriptionStyles(theme)}
            value={description ?? ""}
            placeholder={"Description..."}
            onChange={(e) => setDescription(e.target.value)}
            error={descriptionIsError}
          />
        )}
      </Box>
    </Box>
  );
});

TierListCard.displayName = "TierListCard";
