import { Center, Image } from "@mantine/core";
import { useResponsiveImageSize } from "../../../hooks/store/useResponsiveImagesStore";
import { getSidebarImageContainerSx } from "../styles";
import { ClientSideImage } from "../types";

type Props = {
  img: ClientSideImage;
};

export const OverlayImage = ({ img }: Props) => {
  const size = useResponsiveImageSize((state) => state.size);
  return (
    <Center sx={getSidebarImageContainerSx(size)}>
      <Image src={img.src} sx={{ width: "100%", objectFit: "cover" }} />
    </Center>
  );
};
