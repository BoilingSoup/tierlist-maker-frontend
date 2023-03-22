import {
  Box,
  Button,
  Center,
  CSSObject,
  FileButton,
  Flex,
  Image as MantineImage,
  List,
  MantineTheme,
  Text,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import {
  IconClipboard,
  IconDeviceFloppy,
  IconDownload,
  IconMaximize,
  IconMaximizeOff,
  IconPlus,
  IconWorldUpload,
} from "@tabler/icons-react";
import { Dispatch, RefObject, SetStateAction, useRef } from "react";
import { useClientSideImageID } from "../../hooks/store/useClientSideImageID";
import {
  actionButtonsGroupSx,
  actionButtonsSx,
  addImageButtonsAreaSx,
  addImageButtonSx,
  imageAreaContainerSx,
  imageAreaMaxBoundsSx,
  imagesFlexContainerSx,
  scrollContainerSx,
  sidebarContainerSx,
} from "./styles";
import { ClientSideImage } from "./types";

type FileButtonProps = {
  resetRef: RefObject<() => void>;
  onChange: (files: File[]) => void;
  accept: string;
  multiple: boolean;
};

type Props = {
  imageSources: ClientSideImage[];
  onAddImage: Dispatch<SetStateAction<ClientSideImage[]>>;
  fullScreen: {
    state: boolean;
    toggle: () => Promise<void>;
  };
};

export const Sidebar = ({
  imageSources,
  onAddImage: setImageSources,
  fullScreen,
}: Props) => {
  const resetRef = useRef<() => void>(null);
  const { toggle: toggleFullScreen, state: isFullScreen } = fullScreen;

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

  const clipboard = useClipboard();

  return (
    <Flex sx={sidebarContainerSx}>
      <Box sx={imageAreaMaxBoundsSx}>
        <Flex sx={imageAreaContainerSx}>
          <Center sx={scrollContainerSx}>
            <Flex sx={imagesFlexContainerSx}>
              {!imageSources.length && (
                <Center
                  sx={{
                    height: "100%",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  <Text component="h2" sx={{ fontSize: "1.8rem" }}>
                    Add Images Here!
                  </Text>
                  <br />
                  <List
                    sx={{
                      color: "white",
                      fontSize: "1.3rem",
                    }}
                    styles={{ itemWrapper: { marginTop: "30px" } }}
                  >
                    <List.Item>Copy/Paste images or URLs</List.Item>
                    <List.Item>Use the button below to add files</List.Item>
                  </List>
                </Center>
              )}
              {imageSources.map((img) => (
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
            </Flex>
          </Center>
          <Flex sx={addImageButtonsAreaSx}>
            <FileButton {...fileButtonProps}>
              {(props) => (
                <Button {...props} color="dark.7" sx={addImageButtonSx}>
                  <IconPlus /> Add Files
                </Button>
              )}
            </FileButton>
          </Flex>
        </Flex>
      </Box>
      <Flex sx={actionButtonsGroupSx}>
        <Center component="button" sx={actionButtonsSx}>
          <IconDownload />
          <Text>Export PNG</Text>
        </Center>
        <Center
          component="button"
          sx={actionButtonsSx}
          onClick={toggleFullScreen}
        >
          {isFullScreen ? <IconMaximizeOff /> : <IconMaximize />}
          <Text>{/*isFullscreen ? "Exit" : "Enter"*/} Full Screen</Text>
        </Center>
        <Center component="button" sx={actionButtonsSx}>
          <IconDeviceFloppy />
          <Text>Save</Text>
        </Center>
        <Center component="button" sx={actionButtonsSx}>
          <IconWorldUpload />
          <Text>Publish</Text>
        </Center>
      </Flex>
    </Flex>
  );
};
