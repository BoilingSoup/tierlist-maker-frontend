import { Box, Center, Container, Flex, Grid, Image } from "@mantine/core";
import { THUMBNAIL_WIDTH } from "../../config/config";
import { TierListDisplayData } from "../../lib/types/tierlist";

type Props = {
  data: TierListDisplayData[] | undefined;
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
    <Container sx={{ maxWidth: "80%" }}>
      <Grid gutter={40}>
        {data?.map((item) => (
          <Grid.Col span={6}>
            <Image
              key={item.id}
              src={item.thumbnail}
              sx={{ margin: "auto", maxWidth: THUMBNAIL_WIDTH }}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
    //</Flex>
  );
};

{
  /* <Flex */
}
{
  /*   sx={{ */
}
{
  /*     maxWidth: `${THUMBNAIL_WIDTH * 2 + 200}px`, */
}
{
  /*     // maxWidth: `${THUMBNAIL_WIDTH * 2}px`, */
}
{
  /*     margin: "auto", */
}
{
  /*     flexWrap: "wrap", */
}
{
  /*   }} */
}
{
  /* > */
}
