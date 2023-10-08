import { Container, Flex, Grid } from "@mantine/core";
import { TierListDisplayData } from "../../lib/types/tierlist";
import { TierListCardsSkeleton } from "../tierlist/TierListCardsSkeleton";
import { RecentTierListGridItem } from "./RecentTierListGridItem";
import { recentGridContainerSx } from "./styles";

type Props = {
  data: TierListDisplayData[] | undefined;
  isLoading: boolean;
};

export const RecentTierListGrid = ({ data, isLoading }: Props) => {
  if (isLoading) {
    return (
      <Container sx={recentGridContainerSx}>
        <Flex
          sx={({ spacing }) => ({
            width: "100%",
            color: "white",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: `calc(${spacing.xl} + ${spacing.xl})`,
            ":first-of-type": {
              marginTop: spacing.xl,
            },
            ":last-child": {
              marginBottom: spacing.xl,
            },
          })}
        >
          <TierListCardsSkeleton count={6} />
        </Flex>
      </Container>
    );
  }
  return (
    <Container sx={recentGridContainerSx}>
      <Grid gutter={100}>
        {data?.map((item) => (
          <RecentTierListGridItem item={item} />
        ))}
      </Grid>
    </Container>
  );
};
