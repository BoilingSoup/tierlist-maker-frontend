import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Center, CSSObject, Flex, MantineTheme } from "@mantine/core";
import { CONTAINER } from "./constants";
import { SortableImage } from "./image-area/SortableImage";
import { PxSize, TierListRowData } from "./types";

type Props = {
  data: TierListRowData;
  height: PxSize;
};

const junk = (theme: MantineTheme): CSSObject => ({
  width: "100%",
  backgroundImage: `radial-gradient(ellipse, ${
    theme.colors.dark[9]
  }, ${theme.fn.lighten(theme.colors.dark[8], 0.03)})`,
  border: "2px solid black",
});

export const TierListRow = ({ data, height }: Props) => {
  const { id, color, items, label } = data;
  const { setNodeRef } = useDroppable({
    id,
    data: { type: CONTAINER, containerID: id },
  });

  return (
    <Flex>
      <Center
        sx={{
          // height: `clamp(10vw, ${height}, 140px)`,
          // width: `clamp(10vw, ${height}, 140px)`,
          height,
          width: height,
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
