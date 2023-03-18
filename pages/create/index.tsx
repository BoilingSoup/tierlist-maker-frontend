import { Box, Flex } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { NAVBAR_HEIGHT } from "../../components/common/styles";
import { TierListRow } from "../../components/tierlist/TierListRow";
import { TierListRowProps } from "../../components/tierlist/types";

const initialData: Omit<TierListRowProps, "height">[] = [
  { color: "#fe7f7f", label: "S", items: [] },
  { color: "#febe7e", label: "A", items: [] },
  { color: "#fefe7f", label: "B", items: [] },
  { color: "#7fff7f", label: "C", items: [] },
  { color: "#7fbfff", label: "D", items: [] },
  { color: "#fe7f7f", label: "S", items: [] },
  { color: "#febe7e", label: "A", items: [] },
  { color: "#fefe7f", label: "B", items: [] },
  { color: "#7fff7f", label: "C", items: [] },
  { color: "#7fbfff", label: "D", items: [] },
  { color: "#fe7f7f", label: "S", items: [] },
  { color: "#febe7e", label: "A", items: [] },
  { color: "#fefe7f", label: "B", items: [] },
  { color: "#7fff7f", label: "C", items: [] },
  { color: "#7fbfff", label: "D", items: [] },
];

const Create: NextPage = () => {
  const [data, setData] = useState<typeof initialData>(initialData);
  const { height } = useViewportSize();
  const rowHeight = `${
    (height - +NAVBAR_HEIGHT.split("px").shift()!) / data.length
  }px`;

  return (
    <>
      <Head>
        <title>Create Tier List</title>
      </Head>
      <Flex sx={{ width: "100%", height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
        <Box
          sx={{
            width: "80%",
            backgroundColor: "gray",
            color: "white",
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
        <Box sx={{ width: "20%", backgroundColor: "navy", color: "white" }}>
          Toolbar ...
        </Box>
      </Flex>
    </>
  );
};

export default Create;
