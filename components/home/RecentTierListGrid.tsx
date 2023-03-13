import { Box, Flex, Image } from "@mantine/core";
import { THUMBNAIL_WIDTH } from "../../config/config";
import { TierList } from "../../lib/types/tierlist";

type Props = {
  data: TierList[] | undefined;
  isError: boolean;
  error: unknown;
  isLoading: boolean;
};

export const RecentTierListGrid = ({
  data,
}: // isError,
// error,
// isLoading,
Props) => {
  return (
    <Flex
      sx={{
        maxWidth: `${THUMBNAIL_WIDTH * 2 + 200}px`,
        // maxWidth: `${THUMBNAIL_WIDTH * 2}px`,
        margin: "auto",
        flexWrap: "wrap",
      }}
    >
      {data?.map((item) => (
        <Box sx={{ width: "50%" }}>
          <Image
            key={item.id}
            src={item.thumbnail}
            sx={{ maxWidth: THUMBNAIL_WIDTH }}
          />
        </Box>
      ))}
    </Flex>
  );
};
