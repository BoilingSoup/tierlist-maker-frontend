import { Carousel } from "@mantine/carousel";
import { CSSObject, Image, Text, Stack } from "@mantine/core";
import { THUMBNAIL_WIDTH } from "../../config/config";
import { TierListDisplayData } from "../../lib/types/tierlist";
import { CAROUSEL_THUMBNAIL_BORDER_RADIUS } from "./styles";

type Prop = {
  data: TierListDisplayData;
};

const carouselSlideSx = (): CSSObject => ({
  maxWidth: THUMBNAIL_WIDTH,
});

const carouselSlideStackSx = (): CSSObject => ({
  alignItems: "center",
  justifyContent: "center",
  color: "white",
});

export const CarouselSlide = ({ data }: Prop) => {
  const { creator, thumbnail, created_at } = data;

  return (
    <Carousel.Slide sx={carouselSlideSx}>
      <Image
        src={thumbnail}
        alt="tier list thumbnail"
        radius={CAROUSEL_THUMBNAIL_BORDER_RADIUS}
      />
      <Stack sx={carouselSlideStackSx}>
        <Text>{creator.username}</Text>
        <Text>{created_at}</Text>
      </Stack>
    </Carousel.Slide>
  );
};
