import {
  Flex,
  Center,
  FileButton,
  Button,
  Image as MantineImage,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { ImageAreaContainer } from "./ImageAreaContainer";
import { ImageAreaInfo } from "./ImageAreaInfo";
import { ImageAreaScrollContainer } from "./ImageAreaScrollContainer";
import { addImageButtonsAreaSx, addImageButtonSx } from "../styles";
import { ClientSideImage } from "../types";
import { useClientSideImageID } from "../../../hooks/store/useClientSideImageID";
import { Dispatch, RefObject, SetStateAction, useRef } from "react";

type FileButtonProps = {
  resetRef: RefObject<() => void>;
  onChange: (files: File[]) => void;
  accept: string;
  multiple: boolean;
};

type Props = {
  images: ClientSideImage[];
  onAddImage: Dispatch<SetStateAction<ClientSideImage[]>>;
};

export const ImageArea = ({ images, onAddImage: setImageSources }: Props) => {
  const resetRef = useRef<() => void>(null);

  const addFileHandler = (files: File[]) => {
    const newImages: ClientSideImage[] = files.map((file) => ({
      id: useClientSideImageID.getState().getID(),
      src: URL.createObjectURL(file),
    }));
    console.log(newImages);
    setImageSources((prev) => [...prev, ...newImages]);

    if (resetRef.current !== null) {
      resetRef.current();
    }
  };

  const fileButtonProps: FileButtonProps = {
    resetRef: resetRef,
    onChange: addFileHandler,
    accept: "image/png,image/jpeg,image/webp",
    multiple: true,
  };
  return (
    <ImageAreaContainer>
      <ImageAreaScrollContainer>
        {!images.length && <ImageAreaInfo />}
        {images.map((img) => (
          <Center
            key={img.id}
            sx={{
              width: "100px",
              height: "100px",
              overflow: "hidden",
              border: "2px solid white",
              margin: "1px",
            }}
          >
            <MantineImage
              src={img.src}
              // width={100}
              // height={100}
              sx={{ height: "auto", width: "100px" }}
            />
          </Center>
        ))}
      </ImageAreaScrollContainer>
      <Flex sx={addImageButtonsAreaSx}>
        <FileButton {...fileButtonProps}>
          {(props) => (
            <Button {...props} color="dark.7" sx={addImageButtonSx}>
              <IconPlus /> Add Files
            </Button>
          )}
        </FileButton>
      </Flex>
    </ImageAreaContainer>
  );
};
