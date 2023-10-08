import { Box, Center, Flex, Text } from "@mantine/core";
import type { NextPage } from "next";
import { InfiniteScrollLoading } from "../../components/tierlist/InfiniteScrollLoading";
import {
  noPublicTierListsContainerSx,
  noPublicTierListsTextSx,
  publicTierListsFlexSx,
  publicTierListsMainContainerSx,
} from "../../components/tierlist/styles";
import { TierListCard } from "../../components/tierlist/TierListCard";
import { TierListCardsSkeleton } from "../../components/tierlist/TierListCardsSkeleton";
import { useGetInfinitePublicTierLists } from "../../hooks/api/useGetInfinitePublicTierLists";
import { useGetInfiniteUserTierLists } from "../../hooks/api/useGetInfiniteUserTierLists";
import { useRecentTierList } from "../../hooks/api/useRecentTierList";

const Browse: NextPage = () => {
  const {
    lastTierListRef,
    query: { data, isLoading, isFetchingNextPage },
  } = useGetInfinitePublicTierLists();

  useGetInfiniteUserTierLists();
  useRecentTierList();

  const pages = data?.pages;

  const noPublicTierLists = pages !== undefined && pages[0].data.length === 0;

  return (
    <Box sx={publicTierListsMainContainerSx}>
      <Flex sx={publicTierListsFlexSx}>
        {isLoading && <TierListCardsSkeleton count={40} />}

        {noPublicTierLists && (
          <Center sx={noPublicTierListsContainerSx}>
            <Text sx={noPublicTierListsTextSx}>No public tier lists found!</Text>
          </Center>
        )}

        {pages?.map((pg, i) => {
          const isLastPage = pages.length - 1 === i;

          return pg.data.map((tierList, j) => {
            const isLastTierList = pg.data.length - 1 === j;
            if (isLastPage && isLastTierList) {
              return <TierListCard key={tierList.id} tierList={tierList} ref={lastTierListRef} readonly />;
            }
            return <TierListCard key={tierList.id} tierList={tierList} readonly />;
          });
        })}

        {isFetchingNextPage && <InfiniteScrollLoading />}
      </Flex>
    </Box>
  );
};

export default Browse;
