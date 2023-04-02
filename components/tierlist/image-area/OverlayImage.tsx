import { Center, Image } from "@mantine/core";
import { sidebarImageContainerSx } from "../styles";
import { ClientSideImage } from "../types";

type Props = {
  img: ClientSideImage;
};

export const OverlayImage = ({ img }: Props) => {
  return (
    <Center key={img.id} sx={sidebarImageContainerSx}>
      <Image src={img.src} sx={{ height: "auto", width: "100px" }} />
    </Center>
  );
};