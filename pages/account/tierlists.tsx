import { Flex, Skeleton } from "@mantine/core";
import type { NextPage } from "next";
import { useRef } from "react";
import { AccountNavShell } from "../../components/account/AccountNavShell";
import { useRedirectIfUnauthenticated } from "../../components/common/hooks/useRedirectIfUnauthenticated";
import { TierListCard } from "../../components/tierlist/TierListCard";
import { useAuth } from "../../contexts/AuthProvider";
import { useGetUserTierLists } from "../../hooks/api/useGetUserTierLists";
import { tierListSkeletonSx } from "../../components/tierlist/styles";

const TierLists: NextPage = () => {
  const { user, isLoading: isLoadingUser } = useAuth();
  useRedirectIfUnauthenticated({ user, isLoading: isLoadingUser, redirectTo: "/" });

  const { data, isLoading } = useGetUserTierLists();
  const lastTierListRef = useRef(null);

  console.log({ data });
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
          ":first-child": {
            marginTop: theme.spacing.xl,
          },
          ":last-child": {
            marginBottom: theme.spacing.xl,
          },
        })}
      >
        {data?.data.map((tierList, i) => {
          if (i === data.data.length - 1) {
            return <TierListCard key={tierList.id} ref={lastTierListRef} tierList={tierList} />;
          }
          return <TierListCard key={tierList.id} tierList={tierList} />;
        })}
      </Flex>
    </AccountNavShell>
  );
};

export default TierLists;
