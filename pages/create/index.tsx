import { Box, Flex } from "@mantine/core";
import {
  useFullscreen as useFullScreen,
  useViewportSize,
} from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { NAVBAR_HEIGHT } from "../../components/common/styles";
import { usePasteEvent } from "../../components/tierlist/hooks/usePasteEvent";
import { Sidebar } from "../../components/tierlist/Sidebar";
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

const Create: NextPage = () => {
  const fullScreen = useFullScreen();
  const isFullScreen = fullScreen.fullscreen;
  //
  //
  const [data, setData] = useState<typeof initialData>(initialData);
  const { height } = useViewportSize();
  const rowHeight = isFullScreen
    ? `${height / data.length}px`
    : `${(height - +NAVBAR_HEIGHT.split("px").shift()!) / data.length}px`;

  const [imageSources, setImageSources] = useState<Array<ClientSideImage>>([]);

  usePasteEvent(setImageSources);

  return (
    <>
      <Head>
        <title>Create Tier List</title>
      </Head>
      <Flex
        ref={fullScreen.ref}
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
        <Sidebar
          fullScreen={{
            state: isFullScreen,
            toggle: fullScreen.toggle,
          }}
          imageSources={imageSources}
          onAddImage={setImageSources}
        />
      </Flex>
    </>
  );
};

export default Create;
