import { Center, Container, Grid, Image, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { THUMBNAIL_WIDTH } from "../../config/config";
import { TierListDisplayData } from "../../lib/types/tierlist";
import { capitalize, getTimeDiff } from "../common/helpers";
import { recentGridContainerSx, recentGridItemWrapperSx } from "./styles";

type Props = {
  data: TierListDisplayData[] | undefined;
  isError: boolean;
  error: unknown;
  isLoading: boolean;
};

export const RecentTierListGrid = ({ data }: Props) => {
  const router = useRouter();

  const handleNavigate = (id: string) => () => {
    if (data === undefined) {
      return;
    }

    router.push(`/tierlist/${id}`);
  };

  return (
    <Container sx={recentGridContainerSx}>
      <Grid gutter={100}>
        {data?.map((item) => (
          <Grid.Col key={item.id} span={6}>
            <Center onClick={handleNavigate(item.id)} sx={recentGridItemWrapperSx}>
              <Stack sx={{ alignItems: "center" }}>
                <Text component="h4" m={0} sx={{ fontSize: "clamp(1rem, 6vw, 1.5rem)" }}>
                  {item.title}
                </Text>
                <Text>
                  <Text span color="gray.6">
                    By{" "}
                  </Text>
                  {capitalize(item.creator.username)}{" "}
                  <Text span color="gray.6">
                    {getTimeDiff(item.created_at)}
                  </Text>
                </Text>
                <Image key={item.id} src={item.thumbnail} sx={{ maxWidth: THUMBNAIL_WIDTH }} />
              </Stack>
            </Center>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};
