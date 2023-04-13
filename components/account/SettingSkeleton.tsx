import { Center, Skeleton } from "@mantine/core";
import { inputHeight, settingSkeletonSx, skeletonBarHeight } from "./styles";

export const SettingSkeleton = () => {
  return (
    <Center h={inputHeight} w="100%">
      <Skeleton height={skeletonBarHeight} w="100%" sx={settingSkeletonSx} />
    </Center>
  );
};
