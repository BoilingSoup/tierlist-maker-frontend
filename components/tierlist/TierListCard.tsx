import {
  Box,
  Button,
  Flex,
  Image,
  Loader,
  Paper,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconDeviceFloppy, IconEye, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { forwardRef, useReducer, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useDeleteTierListMutation } from "../../hooks/api/useDeleteTierListMutation";
import { useSetIsPublicMutation } from "../../hooks/api/useSetIsPublicMutation";
import { useUpdateTierListInfoMutation } from "../../hooks/api/useUpdateTierListInfoMutation";
import { capitalizeSentences, lastCharIsPunctuation, titleCase } from "./helpers";
import { useCenterThumbnailIfSmall } from "./hooks/useCenterThumbnailIfSmall";
import {
  tierListCardButtonsContainerSx,
  tierListCardContainerSx,
  getTierListCardDescriptionStyles,
  tierListCardImageContainerSx,
  tierListCardImageSx,
  grayButtonHoverSx,
  getTierListCardTitleInputStyles,
  tierListCardMidSectionSx,
} from "./styles";
import { UserTierListsResponse } from "./types";

type Props = {
  tierList: UserTierListsResponse["data"][number];
  readonly?: boolean;
};

const titleMaxLength = 80;
const descriptionMaxLength = 100;

export const TierListCard = forwardRef<HTMLDivElement, Props>(({ tierList, readonly }, observerRef) => {
  const { user } = useAuth();
  const isOwner = user?.id === tierList.user_id;

  const theme = useMantineTheme();

  const [isEditing, toggle] = useReducer((prev) => !prev, false);

  const [title, setTitle] = useState(tierList.title);
  const titleIsError = title.length > titleMaxLength || title.trim().length === 0;

  const [description, setDescription] = useState(tierList.description ? capitalizeSentences(tierList.description) : "");
  const descriptionIsError = lastCharIsPunctuation(description)
    ? description.length > descriptionMaxLength + 1 // frontend adds (.) if no punctuation at end. (.) is not saved in database.
    : description.length > descriptionMaxLength;

  const hasErrors = titleIsError || descriptionIsError;

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { mutate: deleteTierListMutation } = useDeleteTierListMutation(tierList.is_public);

  const { mutate: updateTierListInfoMutation } = useUpdateTierListInfoMutation(tierList.is_public);

  const handleCancel = () => {
    setTitle(tierList.title);
    setDescription(tierList.description ? capitalizeSentences(tierList.description) : "");
    toggle();
  };

  const handleSave = () => {
    toggle();
    updateTierListInfoMutation({
      title: title.trim(),
      description: description.trim(),
      tierListID: tierList.id,
      setTitle,
      setDescription,
    });
  };

  const switchRef = useRef<HTMLInputElement>(null);
  const [switchState, setSwitchState] = useState(tierList.is_public);

  const { mutate: setIsPublicMutation, isLoading: isMutating } = useSetIsPublicMutation();

  const handleToggleIsPublic = () => {
    if (!switchRef.current) {
      return;
    }
    setSwitchState((prev) => !prev);

    setIsPublicMutation({ is_public: switchRef.current?.checked, tierListID: tierList.id, setSwitchState });
  };

  const mantineImageRootRef = useRef<HTMLDivElement>(null);
  useCenterThumbnailIfSmall({ ref: mantineImageRootRef, tierList });

  return (
    <Paper shadow="xl" ref={observerRef} sx={tierListCardContainerSx(isEditing)}>
      {readonly ? (
        <Text color="gray.4" m="lg" size="xl" weight={"bold"} align="center">
          {titleCase(title)}
        </Text>
      ) : (
        <TextInput
          value={titleCase(title)}
          disabled={!isEditing}
          styles={getTierListCardTitleInputStyles(theme)}
          onChange={(e) => setTitle(e.target.value)}
          error={titleIsError}
        />
      )}
      <Box sx={{ height: "100%", margin: `0 ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.lg}` }}>
        <Flex sx={tierListCardMidSectionSx}>
          <Box sx={tierListCardImageContainerSx}>
            <Image ref={mantineImageRootRef} src={tierList.thumbnail} sx={tierListCardImageSx} />
          </Box>
          <Stack sx={tierListCardButtonsContainerSx}>
            {readonly ? (
              <Button
                component={Link}
                href={`/tierlist/${tierList.id}`}
                color="cyan.6"
                leftIcon={<IconEye />}
                sx={(theme) => ({ height: "60px", ":hover": { background: theme.colors.cyan[8] } })}
              >
                View
              </Button>
            ) : showDeleteConfirmation ? (
              <>
                <Text color="white">
                  This can not be undone. <br />
                  Are you sure?
                </Text>
                <Flex gap={"sm"}>
                  <Button w="50%" color="gray.7" onClick={() => setShowDeleteConfirmation(false)}>
                    No
                  </Button>
                  <Button onClick={() => deleteTierListMutation(tierList.id)} w="50%" color="red.8">
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
                <Button onClick={() => setShowDeleteConfirmation(true)} color="red.8" leftIcon={<IconTrash />}>
                  Delete
                </Button>
              </>
            ) : (
              <>
                {isOwner && (
                  <Button onClick={toggle} color="gray.8" leftIcon={<IconPencil />} sx={grayButtonHoverSx}>
                    Edit
                  </Button>
                )}
                <Button
                  component={Link}
                  href={`/tierlist/${tierList.id}`}
                  color="cyan.6"
                  leftIcon={<IconEye />}
                  sx={(theme) => ({ ":hover": { background: theme.colors.cyan[8] } })}
                >
                  View
                </Button>
                {isOwner && (
                  <Switch
                    color="green.4"
                    styles={{
                      thumb: { background: "rgb(0, 120, 0)" },
                      label: { color: "white", fontWeight: "bold" },
                      root: { marginLeft: "auto", marginRight: "auto" },
                    }}
                    label={isMutating ? <Loader size={20} /> : switchState ? "Public" : "Not Public"}
                    mt="md"
                    ref={switchRef}
                    defaultChecked={tierList.is_public}
                    checked={switchState}
                    onChange={handleToggleIsPublic}
                    disabled={isMutating}
                  />
                )}
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
    </Paper>
  );
});

TierListCard.displayName = "TierListCard";
