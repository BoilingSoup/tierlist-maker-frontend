import {
  ActionIcon,
  Center,
  Flex,
  Skeleton,
  SpacingValue,
  SystemProp,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconPencilOff } from "@tabler/icons-react";
import { PxSize } from "../tierlist/types";
import {
  accountSettingContainerSx,
  getTextInputStyles,
  inputContainerWidth,
} from "./styles";

type Props = {
  label: string;
  placeholder: string;
  isLoading: boolean;
  editable?: boolean;
  my?: SystemProp<SpacingValue>;
  mx?: SystemProp<SpacingValue>;
};

export const inputHeight: PxSize = "36px";
export const skeletonBarHeight: PxSize = "16px";

export const EditableUserSetting = ({
  label,
  placeholder,
  isLoading,
  my,
  mx = "auto",
}: Props) => {
  const theme = useMantineTheme();

  return (
    <Flex
      my={my}
      mx={mx}
      w={inputContainerWidth}
      sx={accountSettingContainerSx}
    >
      <TextInput
        label={label}
        styles={getTextInputStyles({ theme, isLoading })}
        disabled
        placeholder={placeholder}
        mr={isLoading ? undefined : "md"}
      />
      {isLoading && (
        <Center h={inputHeight} w="100%">
          <Skeleton
            height={skeletonBarHeight}
            sx={(theme) => ({
              width: "100%",
              ":before": {
                background: theme.colors.dark[5],
              },
              ":after": {
                background: theme.colors.dark[7],
              },
            })}
          />
        </Center>
      )}

      {!isLoading && (
        <ActionIcon
          sx={(theme) => ({ ":hover": { background: theme.colors.dark[5] } })}
        >
          {/* <IconPencil /> */}
          <IconPencil />
        </ActionIcon>
      )}
    </Flex>
  );
};
