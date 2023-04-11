import { Center, Skeleton } from "@mantine/core";
import { PxSize } from "../tierlist/types";
import { settingSkeletonSx } from "./styles";

const skeletonBarHeight: PxSize = "16px";
const inputHeight: PxSize = "36px";

export const SettingSkeleton = () => {
  return (
    <Center h={inputHeight} w="100%">
      <Skeleton height={skeletonBarHeight} w="100%" sx={settingSkeletonSx} />
    </Center>
  );
};
