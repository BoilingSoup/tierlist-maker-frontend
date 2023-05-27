import { Button, FileButton } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { addFileButtonSx } from "../styles";
import { ClientSideImage } from "../types";

type Props = {
  onAddImage: (images: ClientSideImage[]) => void;
};

export const AddFileButton = ({ onAddImage: setImageSources }: Props) => {
  const resetRef = useRef<() => void>(null);

  const addFileHandler = (files: File[]) => {
    const newImages: ClientSideImage[] = files.map((file) => ({
      id: nanoid(),
      src: URL.createObjectURL(file),
    }));
    setImageSources(newImages);

    if (resetRef.current !== null) {
      resetRef.current();
    }
  };

  return (
    <FileButton resetRef={resetRef} onChange={addFileHandler} accept="image/png,image/jpeg,image/webp" multiple>
      {(props) => (
        <Button {...props} sx={addFileButtonSx}>
          <IconPlus /> Add Files
        </Button>
      )}
    </FileButton>
  );
};
