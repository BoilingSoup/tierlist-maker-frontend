import { Box, Button, Flex, Image } from "@mantine/core";
import { useViewportSize, useWindowEvent } from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Split from "react-split";
import { NAVBAR_HEIGHT } from "../../components/common/styles";
import { TierListRow } from "../../components/tierlist/TierListRow";
import { TierListRowProps } from "../../components/tierlist/types";

// TODO: figure out how to make a unique key prop for these
const initialData: Omit<TierListRowProps, "height">[] = [
  { color: "#fe7f7f", label: "S", items: [] },
  { color: "#febe7e", label: "A", items: [] },
  { color: "#fefe7f", label: "B", items: [] },
  { color: "#7fff7f", label: "C", items: [] },
  { color: "#7fbfff", label: "D", items: [] },
];

const Create: NextPage = () => {
  const [data, setData] = useState<typeof initialData>(initialData);
  const { width, height } = useViewportSize();
  const rowHeight = `${
    (height - +NAVBAR_HEIGHT.split("px").shift()!) / data.length
  }px`;

  const [collapseIndex, setCollapseIndex] = useState<number | undefined>(
    undefined
  );

  const [imageSources, setImageSources] = useState<Array<string>>([]);
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
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setImageSources((prev) => [...prev, fileReader.result as string]);
      };
    }
  });

  return (
    <>
      <Head>
        <title>Create Tier List</title>
      </Head>
      <Flex sx={{ width: "100%", height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
        <Split
          sizes={[70, 30]} // might need dynamic state for TODO below
          maxSize={[Infinity, width * 0.4]}
          collapsed={collapseIndex}
          onDragEnd={(sizes) => console.log(sizes)} // TODO: make collapse/uncollapse size more reactive to current size.
          dragInterval={1}
          direction="horizontal"
          style={{ height: "100%", width: "100%", display: "flex" }}
        >
          <Box
            sx={{
              backgroundColor: "gray",

              overflow: "auto",
            }}
          >
            {data.map((row) => (
              <TierListRow
                label={row.label}
                items={row.items}
                color={row.color}
                height={rowHeight}
              />
            ))}
          </Box>
          <Box
            sx={{
              backgroundColor: "navy",
              color: "white",
            }}
          >
            <Button
              onClick={() => setCollapseIndex((prev) => (prev ? undefined : 1))}
            >
              Collapse
            </Button>
            {imageSources.map((src) => (
              <Image src={src} />
            ))}
          </Box>
        </Split>
      </Flex>
    </>
  );
};

export default Create;
