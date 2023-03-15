import { Container, Grid, Image, Stack, Text } from "@mantine/core";
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
    <Container sx={{ maxWidth: "80%", color: "white" }}>
      <Grid gutter={40}>
        {data?.map((item) => (
          <Grid.Col span={6}>
            <Stack sx={{ alignItems: "center" }}>
              <Text
                component="h4"
                sx={{ margin: "0.5rem", fontSize: "clamp(1rem, 6vw, 1.5rem)" }}
              >
                {item.title}
              </Text>
              <Image
                key={item.id}
                src={item.thumbnail}
                sx={{ maxWidth: THUMBNAIL_WIDTH }}
              />
              <Text>
                by {item.creator.username} {item.created_at}
              </Text>
            </Stack>
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
