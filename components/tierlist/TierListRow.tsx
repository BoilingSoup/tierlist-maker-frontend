import { SortableContext } from "@dnd-kit/sortable";
import { Center, CSSObject, Flex, MantineTheme } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconSettings } from "@tabler/icons-react";
import { useDroppableRow } from "./hooks/useDroppableRow";
import { SortableImage } from "./image-area/SortableImage";
import { PxSize, TierListRowData } from "./types";

type Props = {
  data: TierListRowData;
  height: PxSize;
  maxHeight: PxSize;
};

const junk = (theme: MantineTheme): CSSObject => ({
  width: "100%",
  backgroundImage: `radial-gradient(ellipse, ${theme.colors.dark[9]}, ${theme.fn.lighten(theme.colors.dark[8], 0.03)})`,
});

export const TierListRow = ({ data, height, maxHeight }: Props) => {
  const { id, color, items, label } = data;
  const { setNodeRef } = useDroppableRow(id);

  return (
    <Flex
      sx={{
        border: "2px solid black",
        height: `clamp(100px, ${height}, ${maxHeight})`,
      }}
    >
      <Center
        sx={{
          width: `clamp(100px, ${height}, ${maxHeight})`,
          backgroundColor: color,
          color: "black",
          fontSize: "clamp(2rem, 6vw, 3rem)",
          borderRight: "2px solid black",
        }}
      >
        {label}
      </Center>
      <SortableContext items={items.map((item) => item.id)}>
        <Flex sx={junk} ref={setNodeRef}>
          {items.map((item) => (
            <SortableImage key={item.id} img={item} containerID={data.id} />
          ))}
        </Flex>
      </SortableContext>
      <Flex sx={{ background: "black", width: "120px" }}>
        <Center w="50%">
          <IconSettings color="white" />
        </Center>
        <Center w="50%" sx={{ flexDirection: "column", justifyContent: "space-evenly" }}>
          <IconChevronUp color="white" />
          <IconChevronDown color="white" />
        </Center>
      </Flex>
    </Flex>
  );
};
