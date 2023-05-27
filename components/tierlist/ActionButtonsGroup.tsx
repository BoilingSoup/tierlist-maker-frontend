import { Flex } from "@mantine/core";
import { IconDeviceFloppy, IconDownload, IconMaximize, IconMaximizeOff, IconWorldUpload } from "@tabler/icons-react";
import { ActionButton } from "./ActionButton";
import { actionButtonsGroupSx } from "./styles";
import { FullScreenProp } from "./types";

type Props = {
  fullScreen: FullScreenProp;
};

export const ActionButtonsGroup = ({ fullScreen }: Props) => {
  const { state: isFullScreen, toggle: toggleFullScreen } = fullScreen;

  const fullScreenIcon = isFullScreen ? <IconMaximizeOff size={23} /> : <IconMaximize size={23} />;

  return (
    <Flex sx={actionButtonsGroupSx}>
      <ActionButton icon={<IconDownload size={23} />} text="Export PNG" />
      <ActionButton icon={fullScreenIcon} text="Full Screen" onClick={toggleFullScreen} />
      <ActionButton icon={<IconDeviceFloppy size={23} />} text="Save" />
      <ActionButton icon={<IconWorldUpload size={23} />} text="Publish" />
    </Flex>
  );
};
