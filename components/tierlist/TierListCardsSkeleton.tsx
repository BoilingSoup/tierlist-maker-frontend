import { Skeleton } from "@mantine/core";
import { tierListCardSkeletonSx } from "./styles";

type Props = {
  count: number;
};

export const TierListCardsSkeleton = ({ count }: Props) => {
  const tierListCardsSkeleton = new Array(count)
    .fill(undefined)
    .map((_, i) => <Skeleton key={i} sx={tierListCardSkeletonSx} />);

  return <>{tierListCardsSkeleton}</>;
};
