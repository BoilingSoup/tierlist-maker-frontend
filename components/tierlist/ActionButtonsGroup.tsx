import { Button, Flex, Loader, Modal } from "@mantine/core";
import { IconDeviceFloppy, IconDownload, IconMaximize, IconMaximizeOff, IconWorldUpload } from "@tabler/icons-react";
import { ActionButton } from "./ActionButton";
import { actionButtonsGroupSx, exportedImageStyle, modalButtonsContainerSx, modalStyles } from "./styles";
import { FullScreenProp } from "./types";
import { useIsExportingStore } from "../../hooks/store/useIsExportingStore";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useIsDesktopScreen } from "../common/hooks/useIsDesktopScreen";
import { useAuth } from "../../contexts/AuthProvider";
import { getImageHandlers } from "./helpers";

type Props = {
  fullScreen: FullScreenProp;
  onSave: () => void;
  onPublish: () => void;
};

export const ActionButtonsGroup = ({ fullScreen, onSave: handleSave, onPublish: handlePublish }: Props) => {
  const { user } = useAuth();

  const setIsExporting = useIsExportingStore((state) => state.setValue);

  const [opened, { open, close }] = useDisclosure(false);

  const handleCloseModal = () => {
    setIsExporting(false);
    close();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const { handleDownloadImage, handleExportPreview } = getImageHandlers({
    setImgSrc,
    setIsDownloading,
    setIsExporting,
    setIsLoading,
    openModal: open,
  });

  const { state: isFullScreen, toggle: toggleFullScreen } = fullScreen;
  const fullScreenIcon = isFullScreen ? <IconMaximizeOff size={23} /> : <IconMaximize size={23} />;

  return (
    <>
      <ExportImageModal
        opened={opened}
        src={imgSrc}
        isLoading={isLoading}
        isDownloading={isDownloading}
        onClose={handleCloseModal}
        onDownloadImage={handleDownloadImage}
      />
      <Flex sx={actionButtonsGroupSx}>
        <ActionButton icon={<IconDownload size={23} />} text="Export PNG" onClick={handleExportPreview} />
        <ActionButton icon={fullScreenIcon} text="Full Screen" onClick={toggleFullScreen} />
        {user !== null && (
          <>
            <ActionButton icon={<IconDeviceFloppy size={23} />} text="Save" onClick={handleSave} />
            <ActionButton icon={<IconWorldUpload size={23} />} text="Publish" onClick={handlePublish} />
          </>
        )}
      </Flex>
    </>
  );
};

type ExportImageModalProps = {
  src: string;
  opened: boolean;
  onClose: () => void;
  onDownloadImage: () => void;
  isDownloading: boolean;
  isLoading: boolean;
};

const ExportImageModal = ({
  src,
  opened,
  onClose: handleCloseModal,
  onDownloadImage: handleDownloadImage,
  isDownloading,
  isLoading,
}: ExportImageModalProps) => {
  // Custom styled modal is hard to "click-out" of.
  // I can fight the component library's CSS or use this hook to tweak the click out behavior to how it should be... hook is easier.
  const [setClickable1, setClickable2] = useClickOutModal(handleCloseModal);

  const isDesktop = useIsDesktopScreen();

  return (
    <Modal opened={opened} onClose={handleCloseModal} centered size="auto" withCloseButton={false} styles={modalStyles}>
      {!isLoading && <img ref={setClickable1} src={src} style={exportedImageStyle} />}
      {isLoading ? (
        <Loader />
      ) : (
        <Flex sx={modalButtonsContainerSx}>
          <Button ref={setClickable2} size={isDesktop ? "xl" : "md"} color="lime.9" onClick={handleDownloadImage}>
            {!isDownloading ? "Download" : <Loader color="gray.0" />}
          </Button>
          <Button size={isDesktop ? "xl" : "md"} color="dark.4" onClick={handleCloseModal}>
            Close
          </Button>
        </Flex>
      )}
    </Modal>
  );
};

const useClickOutModal = (close: () => void) => {
  const [clickable1, setClickable1] = useState<HTMLElement | null>(null); // click on image doesn't close modal
  const [clickable2, setClickable2] = useState<HTMLElement | null>(null); // click on download button doesn't close modal

  useClickOutside(close, null, [clickable1, clickable2]);

  return [setClickable1, setClickable2];
};
