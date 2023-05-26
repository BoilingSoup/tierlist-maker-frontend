import { SortableContext } from "@dnd-kit/sortable";
import { Center, CSSObject, Flex, MantineTheme } from "@mantine/core";
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
  border: "2px solid black",
});

export const TierListRow = ({ data, height, maxHeight }: Props) => {
  const { id, color, items, label } = data;
  const { setNodeRef } = useDroppableRow(id);

  return (
    <Flex>
      <Center
        sx={{
          height: `clamp(100px, ${height}, ${maxHeight})`,
          width: `clamp(100px, ${height}, ${maxHeight})`,
          // height,
          // width: height,
          backgroundColor: color,
          color: "black",
          fontSize: "clamp(2rem, 6vw, 3rem)",
          border: "2px solid black",
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
    </Flex>
  );
};
