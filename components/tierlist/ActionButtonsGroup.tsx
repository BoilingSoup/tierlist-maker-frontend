import { Button, Flex, Loader, Modal } from "@mantine/core";
import { IconDeviceFloppy, IconDownload, IconMaximize, IconMaximizeOff, IconWorldUpload } from "@tabler/icons-react";
import { ActionButton } from "./ActionButton";
import { DOM_TO_PNG_ID } from "./constants";
import { actionButtonsGroupSx, exportedImageStyle, modalButtonsContainerSx, modalStyles } from "./styles";
import { FullScreenProp } from "./types";
import DomToImage from "dom-to-image";
import { saveAs } from "file-saver";
import { useIsExportingStore } from "../../hooks/store/useIsExportingStore";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useClickOutModal } from "./hooks/useClickOutModal";
import { useIsDesktopScreen } from "../common/hooks/useIsDesktopScreen";

type Props = {
  fullScreen: FullScreenProp;
};

export const ActionButtonsGroup = ({ fullScreen }: Props) => {
  const setHideToolbars = useIsExportingStore((state) => state.setValue);

  const [opened, { open, close }] = useDisclosure(false);
  const [setClickable1, setClickable2] = useClickOutModal(close); // custom styled modal is hard to "click-out" of. I can fight the CSS or use this hook to tweak the click out behavior to how it should be... hook is easier.

  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [imgSrc, setImgSrc] = useState("");

  const handleExportPreview = () => {
    setIsLoading(true);

    const div = document.getElementById(DOM_TO_PNG_ID)! as HTMLDivElement;
    open();

    setHideToolbars(true); // hide toolbar arrow buttons, gear icon, etc. while converting to png

    DomToImage.toPng(div)
      .then((dataUrl) => {
        setImgSrc(dataUrl);
      })
      .finally(() => {
        setHideToolbars(false);
        setIsLoading(false);
      });
  };

  const handleDownloadImage = () => {
    setIsDownloading(true);

    const div = document.getElementById(DOM_TO_PNG_ID)! as HTMLDivElement;

    setHideToolbars(true);

    DomToImage.toBlob(div)
      .then((blob) => {
        saveAs(blob, `tierlist.png`);
      })
      .finally(() => {
        setIsDownloading(false);
        setHideToolbars(false);
      });
  };

  const { state: isFullScreen, toggle: toggleFullScreen } = fullScreen;
  const fullScreenIcon = isFullScreen ? <IconMaximizeOff size={23} /> : <IconMaximize size={23} />;

  const isDesktop = useIsDesktopScreen();

  return (
    <>
      <Modal opened={opened} onClose={close} centered size="auto" withCloseButton={false} styles={modalStyles}>
        {!isLoading && <img ref={setClickable1} src={imgSrc} style={exportedImageStyle} />}
        {isLoading ? (
          <Loader />
        ) : (
          <Flex sx={modalButtonsContainerSx}>
            <Button ref={setClickable2} size={isDesktop ? "xl" : "md"} color="lime.9" onClick={handleDownloadImage}>
              {!isDownloading ? "Download" : <Loader color="gray.0" />}
            </Button>
            <Button size={isDesktop ? "xl" : "md"} color="dark.4" onClick={close}>
              Close
            </Button>
          </Flex>
        )}
      </Modal>
      <Flex sx={actionButtonsGroupSx}>
        <ActionButton icon={<IconDownload size={23} />} text="Export PNG" onClick={handleExportPreview} />
        <ActionButton icon={fullScreenIcon} text="Full Screen" onClick={toggleFullScreen} />
        <ActionButton icon={<IconDeviceFloppy size={23} />} text="Save" />
        <ActionButton icon={<IconWorldUpload size={23} />} text="Publish" />
      </Flex>
    </>
  );
};
