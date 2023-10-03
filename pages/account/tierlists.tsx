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
    query: { data, isLoading },
  } = useGetInfiniteUserTierLists();
  const pages = data?.pages;

  return (
    <AccountNavShell>
      {isLoading && <Skeleton sx={tierListSkeletonSx} />}

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
