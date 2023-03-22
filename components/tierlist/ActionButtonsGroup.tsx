import { Flex } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconDownload,
  IconMaximize,
  IconMaximizeOff,
  IconWorldUpload,
} from "@tabler/icons-react";
import { ActionButton } from "./ActionButton";
import { actionButtonsGroupSx } from "./styles";
import { FullScreenProp } from "./types";

type Props = {
  fullScreen: FullScreenProp;
};

export const ActionButtonsGroup = ({ fullScreen }: Props) => {
  const { state: isFullScreen, toggle: toggleFullScreen } = fullScreen;

  const fullScreenIcon = isFullScreen ? <IconMaximizeOff /> : <IconMaximize />;

  return (
    <Flex sx={actionButtonsGroupSx}>
      <ActionButton icon={<IconDownload />} text="Export PNG" />
      <ActionButton
        icon={fullScreenIcon}
        text="Full Screen"
        onClick={toggleFullScreen}
      />
      <ActionButton icon={<IconDeviceFloppy />} text="Save" />
      <ActionButton icon={<IconWorldUpload />} text="Publish" />
    </Flex>
  );
};
