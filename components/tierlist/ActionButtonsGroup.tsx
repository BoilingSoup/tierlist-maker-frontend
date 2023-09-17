import { Flex } from "@mantine/core";
import { IconDeviceFloppy, IconDownload, IconMaximize, IconMaximizeOff, IconWorldUpload } from "@tabler/icons-react";
import { ActionButton } from "./ActionButton";
import { DOM_TO_PNG_ID } from "./constants";
import { actionButtonsGroupSx } from "./styles";
import { FullScreenProp } from "./types";
import DomToImage from "dom-to-image";
import { saveAs } from "file-saver";
import { useIsExportingStore } from "../../hooks/store/useIsExportingStore";

type Props = {
  fullScreen: FullScreenProp;
};

export const ActionButtonsGroup = ({ fullScreen }: Props) => {
  const setIsExporting = useIsExportingStore((state) => state.setValue);

  const { state: isFullScreen, toggle: toggleFullScreen } = fullScreen;

  const fullScreenIcon = isFullScreen ? <IconMaximizeOff size={23} /> : <IconMaximize size={23} />;

  const handleExportPng = () => {
    const div = document.getElementById(DOM_TO_PNG_ID)! as HTMLDivElement;

    setIsExporting(true); // hide toolbar arrow buttons, gear icon, etc. while converting to png
    DomToImage.toBlob(div)
      .then((blob) => {
        saveAs(blob, "tierlist.png"); // TODO: better dynamic naming ?
      })
      .finally(() => setIsExporting(false)); // show toolbars again
  };

  return (
    <Flex sx={actionButtonsGroupSx}>
      <ActionButton icon={<IconDownload size={23} />} text="Export PNG" onClick={handleExportPng} />
      <ActionButton icon={fullScreenIcon} text="Full Screen" onClick={toggleFullScreen} />
      <ActionButton icon={<IconDeviceFloppy size={23} />} text="Save" />
      <ActionButton icon={<IconWorldUpload size={23} />} text="Publish" />
    </Flex>
  );
};
