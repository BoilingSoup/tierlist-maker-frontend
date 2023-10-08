import { Box, Flex } from "@mantine/core";
import type { NextPage } from "next";
import { NAVBAR_HEIGHT } from "../../components/common/styles";
import { InfiniteScrollLoading } from "../../components/tierlist/InfiniteScrollLoading";
import { TierListCard } from "../../components/tierlist/TierListCard";
import { TierListCardsSkeleton } from "../../components/tierlist/TierListCardsSkeleton";
import { useGetInfinitePublicTierLists } from "../../hooks/api/useGetInfinitePublicTierLists";
import { useGetInfiniteUserTierLists } from "../../hooks/api/useGetInfiniteUserTierLists";

const Browse: NextPage = () => {
  const {
    lastTierListRef,
    query: { data, isLoading, isFetchingNextPage },
  } = useGetInfinitePublicTierLists();

  useGetInfiniteUserTierLists();

  const pages = data?.pages;

  const noPublicTierLists = pages !== undefined && pages[0].data.length === 0;

  return (
    <Box
      sx={(theme) => ({
        background: theme.colors.dark[7],
        borderTop: `1px solid ${theme.colors.dark[3]}`,
        height: `calc(100vh - ${NAVBAR_HEIGHT})`,
        color: "white",
        overflowY: "scroll",
      })}
    >
      <Flex
        sx={(theme) => ({
          flexWrap: "wrap",
          gap: theme.spacing.lg,
          justifyContent: "center",
          ":first-of-type": {
            marginTop: theme.spacing.xl,
          },
          ":last-child": {
            marginBottom: theme.spacing.xl,
          },
        })}
      >
        {isLoading && <TierListCardsSkeleton count={40} />}

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
