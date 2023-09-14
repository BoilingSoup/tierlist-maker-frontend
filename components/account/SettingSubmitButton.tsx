import { Button, ButtonProps, Skeleton } from "@mantine/core";
import { settingSkeletonSx } from "./styles";

type Props = {
  skeleton: boolean;
  onClick?(): void;
} & ButtonProps &
  Required<Pick<ButtonProps, "w" | "h">>; // h & w props are required (so a skeleton can be rendered while loading)

export const SettingSubmitButton = (props: Props) => {
  const { skeleton: isLoading } = props;

  if (isLoading) {
    return <Skeleton h={props.h} w={props.w} sx={settingSkeletonSx} />;
  }

  return <Button {...(({ skeleton, ...buttonProps }: Props) => buttonProps)(props)}>{props.children}</Button>;
};
