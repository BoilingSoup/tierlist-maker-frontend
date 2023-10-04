import { Center, Flex, Loader, Skeleton, Text } from "@mantine/core";
import type { NextPage } from "next";
import { AccountNavShell } from "../../components/account/AccountNavShell";
import { useRedirectIfUnauthenticated } from "../../components/common/hooks/useRedirectIfUnauthenticated";
import { TierListCard } from "../../components/tierlist/TierListCard";
import { useAuth } from "../../contexts/AuthProvider";
import { useGetInfiniteUserTierLists } from "../../hooks/api/useGetInfiniteUserTierLists";
import { tierListCardSkeletonSx } from "../../components/tierlist/styles";

const TierLists: NextPage = () => {
  const { user, isLoading: isLoadingUser } = useAuth();
  useRedirectIfUnauthenticated({ user, isLoading: isLoadingUser, redirectTo: "/" });

  const {
    lastTierListRef,
    query: { data, isLoading: isLoadingTierLists, isFetchingNextPage },
  } = useGetInfiniteUserTierLists();
  const pages = data?.pages;

  const isNotReady = isLoadingUser || isLoadingTierLists;

  const tierListCardsSkeleton = new Array(6)
    .fill(undefined)
    .map((_, i) => <Skeleton key={i} sx={tierListCardSkeletonSx} />);

  return (
    <AccountNavShell>
      <Flex
        sx={(theme) => ({
          width: "100%",
          color: "white",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: theme.spacing.lg,
          ":first-of-type": {
            marginTop: theme.spacing.xl,
          },
          ":last-child": {
            marginBottom: theme.spacing.xl,
          },
        })}
      >
        {isNotReady && tierListCardsSkeleton}
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
      {isFetchingNextPage && (
        <Center
          sx={(theme) => ({
            marginTop: `calc(${theme.spacing.xl} + ${theme.spacing.lg})`,
            marginBottom: `calc(${theme.spacing.xl} + ${theme.spacing.lg})`,
          })}
        >
          <Loader size="xl" variant="bars" />
          <Text ml="xl" color="gray.0" size="xl">
            Loading...
          </Text>
        </Center>
      )}
    </AccountNavShell>
  );
};

export default TierLists;
