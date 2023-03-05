import { Center, DefaultMantineColor, Loader } from "@mantine/core";
import { recentTierListSkeletonSx } from "./styles";

type Props = {
  color?: DefaultMantineColor;
};

export const RecentTierListSkeleton = ({ color = "gray" }: Props) => {
  return (
    <Center sx={recentTierListSkeletonSx}>
      <Loader color={color} />
    </Center>
  );
};
