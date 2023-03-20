import { Box, Center, Flex, Image as MantineImage, Text } from "@mantine/core";
import { useViewportSize, useWindowEvent } from "@mantine/hooks";
import {
  IconDeviceFloppy,
  IconDownload,
  IconMaximize,
  IconWorldUpload,
} from "@tabler/icons-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { NAVBAR_HEIGHT } from "../../components/common/styles";
import { TierListRow } from "../../components/tierlist/TierListRow";
import {
  ClientSideImage,
  TierListRowProps,
} from "../../components/tierlist/types";
import { useClientSideImageID } from "../../hooks/store/useClientSideImageID";

const initialData: (Omit<TierListRowProps, "height"> & { key: number })[] = [
  { key: 1, color: "#fe7f7f", label: "S", items: [] },
  { key: 2, color: "#febe7e", label: "A", items: [] },
  { key: 3, color: "#fefe7f", label: "B", items: [] },
  { key: 4, color: "#7fff7f", label: "C", items: [] },
  { key: 5, color: "#7fbfff", label: "D", items: [] },
];

const Create: NextPage = () => {
  const [data, setData] = useState<typeof initialData>(initialData);
  const { height } = useViewportSize();
  const rowHeight = `${
    (height - +NAVBAR_HEIGHT.split("px").shift()!) / data.length
  }px`;

  const [imageSources, setImageSources] = useState<Array<ClientSideImage>>([]);
  useWindowEvent("paste", (event: Event) => {
    if (!(event instanceof ClipboardEvent)) {
      return;
    }
    if (!event.clipboardData?.files?.length) {
      return;
    }
    if (event.clipboardData.files.length <= 0) {
      return;
    }

    const file = event.clipboardData.files[0];
    if (file.type.startsWith("image/")) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        // TODO: compress/resize images before displaying

        // let img = new Image();
        // img.onload = () => {
        // console.log(img.width);
        // console.log(img.height);
        // };
        setImageSources((prev) => [
          ...prev,
          {
            id: useClientSideImageID.getState().getID(),
            src: fileReader.result as string,
          },
        ]);
        // img.src = fileReader.result as string;
      };

      fileReader.readAsDataURL(file);
    }
  });

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
          <Flex sx={{ flexWrap: "wrap", height: "80%", background: "black" }}>
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
          </Flex>
          <Box
            sx={{
              width: "100%",
              height: "20%",
              background: "orange",
            }}
          >
            <Center
              component="button"
              sx={{
                width: "50%",
                height: "50%",
                display: "inline",
              }}
            >
              <IconDownload />
              <Text>Export PNG</Text>
            </Center>
            <Center
              component="button"
              sx={{
                width: "50%",
                height: "50%",
                display: "inline",
              }}
            >
              <IconMaximize />
              <Text>Full Screen</Text>
            </Center>
            <Center
              component="button"
              sx={{
                width: "50%",
                height: "50%",
                display: "inline",
              }}
            >
              <IconDeviceFloppy />
              <Text>Save</Text>
            </Center>
            <Center
              component="button"
              sx={{
                width: "50%",
                height: "50%",
                display: "inline",
              }}
            >
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
