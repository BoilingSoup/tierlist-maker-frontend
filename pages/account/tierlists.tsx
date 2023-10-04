import { Flex, Skeleton } from "@mantine/core";
import type { NextPage } from "next";
import { AccountNavShell } from "../../components/account/AccountNavShell";
import { useRedirectIfUnauthenticated } from "../../components/common/hooks/useRedirectIfUnauthenticated";
import { TierListCard } from "../../components/tierlist/TierListCard";
import { useAuth } from "../../contexts/AuthProvider";
import { useGetInfiniteUserTierLists } from "../../hooks/api/useGetInfiniteUserTierLists";
import { tierListSkeletonSx } from "../../components/tierlist/styles";

const TierLists: NextPage = () => {
  const { user, isLoading: isLoadingUser } = useAuth();
  useRedirectIfUnauthenticated({ user, isLoading: isLoadingUser, redirectTo: "/" });

  const {
    lastTierListRef,
    query: { data, isLoading: isLoadingTierLists },
  } = useGetInfiniteUserTierLists();
  const pages = data?.pages;

  const isNotReady = isLoadingUser || isLoadingTierLists;

  const tierListCardsSkeleton = new Array(6).fill(undefined).map(() => (
    <Skeleton
      sx={({ colors }) => ({
        width: "90%",
        maxWidth: "600px",
        height: "300px",
        "&::before": { background: colors.dark[5] },
        "&::after": { background: colors.dark[8] },
      })}
    />
  ));

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
    </AccountNavShell>
  );
};

export default TierLists;
