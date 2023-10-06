import { Center, Flex, Text } from "@mantine/core";
import type { NextPage } from "next";
import { AccountNavShell } from "../../components/account/AccountNavShell";
import { useRedirectIfUnauthenticated } from "../../components/common/hooks/useRedirectIfUnauthenticated";
import { TierListCard } from "../../components/tierlist/TierListCard";
import { useAuth } from "../../contexts/AuthProvider";
import { useGetInfiniteUserTierLists } from "../../hooks/api/useGetInfiniteUserTierLists";
import {
  noSavedTierListsContainerSx,
  noSavedTierListsTextSx,
  tierListCardsContainerSx,
} from "../../components/tierlist/styles";
import { InfiniteScrollLoading } from "../../components/tierlist/InfiniteScrollLoading";
import { TierListCardsSkeleton } from "../../components/tierlist/TierListCardsSkeleton";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const TierLists: NextPage = () => {
  const { user, isLoading: isLoadingUser } = useAuth();
  useRedirectIfUnauthenticated({ user, isLoading: isLoadingUser, redirectTo: "/" });

  const {
    lastTierListRef,
    query: { data, isLoading: isLoadingTierLists, isFetchingNextPage },
  } = useGetInfiniteUserTierLists();
  const pages = data?.pages;

  const isNotReady = isLoadingUser || isLoadingTierLists;

  const [animateChildren] = useAutoAnimate();

  const noSavedTierLists = pages !== undefined && pages[0].data.length === 0;

  return (
    <AccountNavShell>
      <Flex sx={tierListCardsContainerSx} ref={animateChildren}>
        {isNotReady && <TierListCardsSkeleton count={6} />}

        {pages?.map((pg, i) => {
          const isLastPage = pages.length - 1 === i;

          return pg.data.map((tierList, j) => {
            const isLastTierList = pg.data.length - 1 === j;
            if (isLastPage && isLastTierList) {
              return <TierListCard key={tierList.id} tierList={tierList} ref={lastTierListRef} />;
            }
            return <TierListCard key={tierList.id} tierList={tierList} />;
          });
        })}
      </Flex>
      {noSavedTierLists && (
        <Center sx={noSavedTierListsContainerSx}>
          <Text sx={noSavedTierListsTextSx}>You haven't saved any tier lists!</Text>
        </Center>
      )}
      {isFetchingNextPage && <InfiniteScrollLoading />}
    </AccountNavShell>
  );
};

export default TierLists;
