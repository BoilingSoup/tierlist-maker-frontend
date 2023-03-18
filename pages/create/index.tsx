import { Box, Button, Flex } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Split from "react-split";
import { NAVBAR_HEIGHT } from "../../components/common/styles";
import { TierListRow } from "../../components/tierlist/TierListRow";
import { TierListRowProps } from "../../components/tierlist/types";

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

  return (
    <>
      <Head>
        <title>Create Tier List</title>
      </Head>
      <Flex sx={{ width: "100%", height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
        <Split
          sizes={[70, 30]}
          maxSize={[Infinity, width * 0.4]}
          collapsed={collapseIndex}
          onDragEnd={(sizes) => console.log(sizes)}
          dragInterval={1}
          direction="horizontal"
          style={{ height: "100%", width: "100%", display: "flex" }}
        >
          <Box
            sx={{
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
            <p style={{ fontFamily: "serif", overflowWrap: "break-word" }}>
              A problem has been detected and Windows has been shut down to
              prevent damage to your computer.
              <br /> <br />
              If this is the first time you've seen this stop error screen,
              restart your computer. <br />
              If this screen appears again, follow these steps: <br />
              <br />
              Check to make sure any new hardware or software is properly
              installed.
              <br /> If this is a new installation, ask your hardware or
              software manufacturer for and Windows updates you might need.
              <br /> <br />
              If problems continue, disable or remove any newly installed
              hardware or software. Disable BIOS memory options such as caching
              or shadowing. <br />
              If you need to use Safe Mode to remove or disable components,
              restart your computer, press F8 to select Advanced Startup
              Options, and then select Safe Mode.
              <br /> <br /> Technical information:
              <br /> <br /> *** STOP: 0x000000FE (0x00000008, 0x000000006,
              0x00000009, 0x847075cc) <br /> <br />
            </p>
          </Box>
        </Split>
      </Flex>
    </>
  );
};

export default Create;
