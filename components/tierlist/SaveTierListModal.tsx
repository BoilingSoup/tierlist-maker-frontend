import { Button, Center, Flex, Loader, Modal, Progress, Textarea, TextInput } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { ChangeEvent, FormEvent } from "react";
import {
  descriptionInputStyles,
  saveModalStyles,
  submitSaveButtonSx,
  titleInputStyles,
  uploadProgressContainerSx,
} from "./styles";

type SaveImageModalProps = {
  opened: boolean;
  onClose: () => void;
  modalTitle: string;
  tierListTitle: string;
  titlePlaceholder: string;
  requestProgress: number;
  showProgressBar: boolean;
  description: string;
  onSave: (e: FormEvent) => void;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const SaveTierListModal = ({
  opened,
  modalTitle,
  titlePlaceholder,
  requestProgress,
  showProgressBar,
  onClose: handleClose,
  onSave: handleSave,
  onChangeTitle: handleChangeTitle,
  onChangeDescription: handleChangeDescription,
  description,
  tierListTitle,
}: SaveImageModalProps) => {
  const titleTooLong = tierListTitle.length > 80;
  const descriptionTooLong = description.length > 100;

  const invalidForm = titleTooLong || descriptionTooLong;

  return (
    <Modal centered opened={opened} onClose={handleClose} title={modalTitle} styles={saveModalStyles}>
      <form onSubmit={handleSave}>
        <TextInput
          label="Title"
          placeholder={titlePlaceholder}
          styles={titleInputStyles}
          onChange={handleChangeTitle}
          disabled={showProgressBar}
          error={titleTooLong && "Title must be 80 chars or less"}
        />
        <Textarea
          label="Description (optional)"
          styles={descriptionInputStyles}
          onChange={handleChangeDescription}
          disabled={showProgressBar}
          value={description}
          error={descriptionTooLong && "Description must be 100 chars or less"}
        />
        <Flex justify="space-between" gap="lg">
          <Center sx={uploadProgressContainerSx}>
            {showProgressBar && <Progress h={7} w="100%" mt="lg" striped animate value={requestProgress} />}
          </Center>
          <Button
            type="submit"
            leftIcon={!showProgressBar && <IconDeviceFloppy />}
            disabled={showProgressBar || invalidForm}
            sx={submitSaveButtonSx}
          >
            {showProgressBar ? <Loader size={23} color="gray.0" /> : "SAVE"}
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
