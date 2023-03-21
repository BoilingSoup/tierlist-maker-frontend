import {
  Box,
  Button,
  Center,
  CSSObject,
  Flex,
  Image as MantineImage,
  List,
  Text,
  Tooltip,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useFullscreen, useViewportSize } from "@mantine/hooks";
import {
  IconDeviceFloppy,
  IconDownload,
  IconHelpCircle,
  IconMaximize,
  IconMaximizeOff,
  IconWorldUpload,
} from "@tabler/icons-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { NAVBAR_HEIGHT } from "../../components/common/styles";
import { usePasteEvent } from "../../components/tierlist/hooks/usePasteEvent";
import { TierListRow } from "../../components/tierlist/TierListRow";
import {
  ClientSideImage,
  TierListRowProps,
} from "../../components/tierlist/types";

const initialData: (Omit<TierListRowProps, "height"> & { key: number })[] = [
  { key: 1, color: "#fe7f7f", label: "S", items: [] },
  { key: 2, color: "#febe7e", label: "A", items: [] },
  { key: 3, color: "#fefe7f", label: "B", items: [] },
  { key: 4, color: "#7fff7f", label: "C", items: [] },
  { key: 5, color: "#7fbfff", label: "D", items: [] },
];

const buttonsSx: CSSObject = {
  width: "50%",
  height: "50%",
  display: "inline",
};

const buttonsContainer: CSSObject = {
  width: "100%",
  height: "20%",
};

const Create: NextPage = () => {
  const {
    toggle: toggleFullscreen,
    fullscreen,
    ref: fullscreenRef,
  } = useFullscreen();

  //
  const [data, setData] = useState<typeof initialData>(initialData);
  const { height } = useViewportSize();
  const rowHeight = fullscreen
    ? `${height / data.length}px`
    : `${(height - +NAVBAR_HEIGHT.split("px").shift()!) / data.length}px`;

  const [imageSources, setImageSources] = useState<Array<ClientSideImage>>([]);

  /**
   *
   * Move these later
   *
   */

  usePasteEvent(setImageSources);

  const openRef = useRef<() => void>(null);

  return (
    <>
      <Head>
        <title>Create Tier List</title>
      </Head>
      <Flex
        ref={fullscreenRef}
        sx={{
          width: "100%",
          height: `calc(100vh - ${NAVBAR_HEIGHT})`,
        }}
      >
        <Box
          sx={(theme) => ({
            width: "75%",
            backgroundColor: theme.colors.dark[7],
            overflow: "auto",
          })}
        >
          {data.map((row) => (
            <TierListRow
              key={row.key}
              label={row.label}
              items={row.items}
              color={row.color}
              height={rowHeight}
            />
          ))}
        </Box>
        <Box
          sx={(theme) => ({
            width: "25%",
            backgroundColor: theme.colors.dark[4],
            color: "white",
          })}
        >
          <Flex
            sx={(theme) => ({
              flexWrap: "wrap",
              height: "80%",
              background: theme.colors.dark[4],
              alignContent: "flex-start",
            })}
          >
            <Center
              sx={{ width: "100%", height: "90%", alignItems: "flex-end" }}
            >
              <Dropzone
                openRef={openRef}
                onDrop={() => {}}
                activateOnClick={false}
                styles={{
                  inner: {
                    pointerEvents: "all",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "flex-start",
                  },
                }}
                sx={{
                  flexWrap: "wrap",
                  height: "calc(100% - 20px)",
                  width: "95%",
                  marginTop: "20px",
                  background: "inherit",
                  "&:hover": {
                    background: "inherit",
                  },
                  overflow: "auto",
                }}
              >
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
                      <List.Item>Drag & Drop images here</List.Item>
                      <List.Item>
                        Use the button below to upload files
                      </List.Item>
                    </List>
                    {/* <Center sx={{ height: "70%", width: "100%" }}> */}
                    {/*   <Text component="h2" sx={{ fontSize: "1.6rem" }}> */}
                    {/*     Add Images Here! */}
                    {/*   </Text> */}
                    {/* </Center> */}
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
              </Dropzone>
            </Center>
            <Center sx={{ width: "100%", height: "10%", position: "relative" }}>
              <Button onClick={() => (openRef.current as Function)()}>
                Add Image From Computer
              </Button>
              {Boolean(imageSources.length) && (
                <Tooltip label="You can add images by ___">
                  <Flex
                    sx={{
                      position: "absolute",
                      top: "5%",
                      right: "1ch",
                      alignItems: "center",
                    }}
                  >
                    <IconHelpCircle size={"20"} />{" "}
                    <Text component="span" ml="0.5ch">
                      Help
                    </Text>
                  </Flex>
                </Tooltip>
              )}
            </Center>
          </Flex>
          <Box sx={buttonsContainer}>
            <Center component="button" sx={buttonsSx}>
              <IconDownload />
              <Text>Export PNG</Text>
            </Center>
            <Center
              component="button"
              sx={buttonsSx}
              onClick={toggleFullscreen}
            >
              {fullscreen ? <IconMaximizeOff /> : <IconMaximize />}
              <Text>{fullscreen ? "Exit" : "Enter"} Full Screen</Text>
            </Center>
            <Center component="button" sx={buttonsSx}>
              <IconDeviceFloppy />
              <Text>Save</Text>
            </Center>
            <Center component="button" sx={buttonsSx}>
              <IconWorldUpload />
              <Text>Publish</Text>
            </Center>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Create;
