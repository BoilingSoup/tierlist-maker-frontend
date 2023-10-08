import { Center, Grid, Image, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { THUMBNAIL_WIDTH } from "../../config/config";
import { TierListDisplayData } from "../../lib/types/tierlist";
import { capitalize, getTimeDiff } from "../common/helpers";
import { titleCase } from "../tierlist/helpers";
import { recentGridItemWrapperSx } from "./styles";

type Props = {
  item: TierListDisplayData;
};

export const RecentTierListGridItem = ({ item }: Props) => {
  return (
    <Grid.Col key={item.id} span={6}>
      <Center component={Link} href={`/tierlist/${item.id}`} sx={recentGridItemWrapperSx}>
        <Stack sx={{ alignItems: "center" }}>
          <Text component="h4" m={0} sx={{ fontSize: "clamp(1rem, 6vw, 1.5rem)" }}>
            {titleCase(item.title)}
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
  );
};
