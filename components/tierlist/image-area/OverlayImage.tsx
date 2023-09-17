import { Center, Image } from "@mantine/core";
import { sidebarImageContainerSx } from "../styles";
import { ClientSideImage } from "../types";

type Props = {
  img: ClientSideImage;
};

export const OverlayImage = ({ img }: Props) => {
  return (
    <Center sx={sidebarImageContainerSx}>
      <Image src={img.src} sx={{ width: "100%", objectFit: "cover" }} />
    </Center>
  );
};
