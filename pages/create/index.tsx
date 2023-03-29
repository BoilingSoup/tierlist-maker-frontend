import { Box, Flex } from "@mantine/core";
import {
  useFullscreen as useFullScreen,
  useViewportSize,
} from "@mantine/hooks";
import { nanoid } from "nanoid";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { NAVBAR_HEIGHT } from "../../components/common/styles";
import { getFullScreenProp } from "../../components/tierlist/helpers";
import { usePasteEvent } from "../../components/tierlist/hooks/usePasteEvent";
import { Sidebar } from "../../components/tierlist/Sidebar";
import { TierListRow } from "../../components/tierlist/TierListRow";
import { ClientSideImage, InitialData } from "../../components/tierlist/types";

const initialData: InitialData = {
  sidebar: [],
  rows: [
    { id: nanoid(), color: "#fe7f7f", label: "S", items: [] },
    { id: nanoid(), color: "#febe7e", label: "A", items: [] },
    { id: nanoid(), color: "#fefe7f", label: "B", items: [] },
    { id: nanoid(), color: "#7fff7f", label: "C", items: [] },
    { id: nanoid(), color: "#7fbfff", label: "D", items: [] },
  ],
};

const Create: NextPage = () => {
  const fullScreen = useFullScreen();
  const isFullScreen = fullScreen.fullscreen;

  const [data, setData] = useState<InitialData>(initialData);
  const { height } = useViewportSize();
  const rowHeight = isFullScreen
    ? `${height / data.rows.length}px`
    : `${(height - +NAVBAR_HEIGHT.split("px").shift()!) / data.rows.length}px`;

  // const [imageSources, setImageSources] = useState<Array<ClientSideImage>>([]);

  usePasteEvent(setData);

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
          {data.rows.map((row) => (
            <TierListRow
              key={row.id}
              label={row.label}
              items={row.items}
              color={row.color}
              height={rowHeight}
            />
          ))}
        </Box>
        <Sidebar
          fullScreen={getFullScreenProp(fullScreen)}
          imageSources={data.sidebar}
          onAddImage={(newImage: ClientSideImage[]) =>
            setData((prev) => ({
              sidebar: [...prev.sidebar, ...newImage],
              rows: [...prev.rows],
            }))
          }
        />
      </Flex>
    </>
  );
};

export default Create;
