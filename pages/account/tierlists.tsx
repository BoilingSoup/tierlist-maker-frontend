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
import { useGetInfinitePublicTierLists } from "../../hooks/api/useGetInfinitePublicTierLists";
import { useRecentTierList } from "../../hooks/api/useRecentTierList";
import Head from "next/head";
import { SITE_NAME } from "../../config/config";

const TierLists: NextPage = () => {
  const { user, isLoading: isLoadingUser } = useAuth();
  useRedirectIfUnauthenticated({ user, isLoading: isLoadingUser, redirectTo: "/" });

  useGetInfinitePublicTierLists();
  useRecentTierList();

  const {
    lastTierListRef,
    query: { data, isLoading: isLoadingTierLists, isFetchingNextPage },
  } = useGetInfiniteUserTierLists();
  const pages = data?.pages;

  const isNotReady = isLoadingUser || isLoadingTierLists;

  const [animateChildren] = useAutoAnimate();

  const noSavedTierLists = pages !== undefined && pages[0].data.length === 0;
  const emailNotVerified = user !== undefined && user !== null && !user.email_verified;

  return (
    <>
      <Head>
        <title>My Tier Lists - {SITE_NAME}</title>
      </Head>
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
        {emailNotVerified && (
          <Center sx={noSavedTierListsContainerSx}>
            <Text sx={noSavedTierListsTextSx}>You must verify your email to save to your account.</Text>
          </Center>
        )}
        {noSavedTierLists && user?.email_verified && (
          <Center sx={noSavedTierListsContainerSx}>
            <Text sx={noSavedTierListsTextSx}>You haven&apos;t saved any tier lists!</Text>
          </Center>
        )}
        {isFetchingNextPage && <InfiniteScrollLoading />}
      </AccountNavShell>
    </>
  );
};

export default TierLists;
