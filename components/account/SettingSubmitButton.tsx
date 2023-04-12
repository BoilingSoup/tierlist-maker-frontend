import { Button, Flex, Skeleton, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useAuth } from "../../contexts/AuthProvider";
import { PxSize } from "../tierlist/types";
import { buttonSkeletonHeight, settingSkeletonSx } from "./styles";

type Props = {
  isLoading: boolean;
};

const emailVerifiedButtonWidth: PxSize = "95.98px";

export const SettingSubmitButton = ({ isLoading }: Props) => {
  const { user } = useAuth();
  const userIsLoaded = !isLoading && user !== null;

  return (
    <Flex w="100%" justify="flex-end">
      {isLoading && (
        <Skeleton
          h={buttonSkeletonHeight}
          w={emailVerifiedButtonWidth}
          sx={settingSkeletonSx}
        />
      )}
      {!isLoading && (
        <Button
          compact
          h={buttonSkeletonHeight}
          w={95.59}
          // color="dark"
          // variant="outline"
          sx={(theme) => ({
            outline: "0px solid green",
            color: "white",
            background: theme.colors.dark[6],
            ":hover": {
              background: theme.colors.dark[6],
            },
          })}
        >
          {userIsLoaded && user.email_verified && (
            <Text
              span
              sx={(theme) => ({
                display: "flex",
                alignItems: "flex-end",
                color: theme.colors.lime[4],
              })}
            >
              <IconCheck size={20} />
              <Text span ml="1ch">
                verified
              </Text>
            </Text>
          )}
          {userIsLoaded && !user.email_verified && "Resend Verification Email"}
        </Button>
      )}
    </Flex>
  );
};
