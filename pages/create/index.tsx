import {
  Box,
  Button,
  Center,
  CSSObject,
  Flex,
  Group,
  Image as MantineImage,
  Text,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useViewportSize } from "@mantine/hooks";
import {
  IconDeviceFloppy,
  IconDownload,
  IconMaximize,
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
  const [data, setData] = useState<typeof initialData>(initialData);
  const { height } = useViewportSize();
  const rowHeight = `${
    (height - +NAVBAR_HEIGHT.split("px").shift()!) / data.length
  }px`;

  const [imageSources, setImageSources] = useState<Array<ClientSideImage>>([]);

  usePasteEvent(setImageSources);

  const openRef = useRef<() => void>(null);

  return (
    <>
      <Head>
        <title>Create Tier List</title>
      </Head>
      <Flex sx={{ width: "100%", height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
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
            sx={{
              flexWrap: "wrap",
              height: "80%",
              background: "black",
              alignContent: "flex-start",
              overflow: "auto",
            }}
          >
            {/* {!imageSources.length && <Text>No Images!</Text>} */}
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
            <Dropzone
              openRef={openRef}
              onDrop={() => {}}
              activateOnClick={false}
              styles={{ inner: { pointerEvents: "all" } }}
            >
              <Group position="center">
                <Button onClick={() => (openRef.current as () => void)()}>
                  Select files
                </Button>
              </Group>
            </Dropzone>
          </Flex>
          <Box sx={buttonsContainer}>
            <Center component="button" sx={buttonsSx}>
              <IconDownload />
              <Text>Export PNG</Text>
            </Center>
            <Center component="button" sx={buttonsSx}>
              <IconMaximize />
              <Text>Full Screen</Text>
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
