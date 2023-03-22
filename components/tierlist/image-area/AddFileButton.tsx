import { Button, FileButton } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useRef } from "react";
import { useClientSideImageID } from "../../../hooks/store/useClientSideImageID";
import { addFileButtonSx } from "../styles";
import { ClientSideImage } from "../types";

type Props = {
  onAddImage: Dispatch<SetStateAction<ClientSideImage[]>>;
};

export const AddFileButton = ({ onAddImage: setImageSources }: Props) => {
  const resetRef = useRef<() => void>(null);

  const addFileHandler = (files: File[]) => {
    const newImages: ClientSideImage[] = files.map((file) => ({
      id: useClientSideImageID.getState().getID(),
      src: URL.createObjectURL(file),
    }));
    // console.log(newImages);
    setImageSources((prev) => [...prev, ...newImages]);

    if (resetRef.current !== null) {
      resetRef.current();
    }
  };

  return (
    <FileButton
      resetRef={resetRef}
      onChange={addFileHandler}
      accept="image/png,image/jpeg,image/webp"
      multiple
    >
      {(props) => (
        <Button {...props} color="dark.7" sx={addFileButtonSx}>
          <IconPlus /> Add Files
        </Button>
      )}
    </FileButton>
  );
};
