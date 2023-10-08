import { Carousel } from "@mantine/carousel";
import { Image, Text, Stack, Box } from "@mantine/core";
import { useRouter } from "next/router";
import { TierListDisplayData } from "../../lib/types/tierlist";
import { capitalize, getTimeDiff } from "../common/helpers";
import {
  carouselSlideStackSx,
  carouselSlideSx,
  carouselSlideWrapperSx,
  CAROUSEL_THUMBNAIL_BORDER_RADIUS,
} from "./styles";

type Prop = {
  data: TierListDisplayData;
};

export const CarouselSlide = ({ data }: Prop) => {
  const { creator, thumbnail, created_at } = data;
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/tierlist/${data.id}`);
  };

  return (
    <Carousel.Slide sx={carouselSlideSx}>
      <Box onClick={handleNavigate} sx={carouselSlideWrapperSx}>
        <Text
          component="h4"
          sx={{ fontSize: "clamp(1rem, 6vw, 1.5rem)", color: "white", marginTop: "1ch", textAlign: "center" }}
        >
          {data.title}
        </Text>
        <Image src={thumbnail} alt="tier list thumbnail" radius={CAROUSEL_THUMBNAIL_BORDER_RADIUS} />
        <Stack sx={carouselSlideStackSx}>
          <Text mt="xl">
            <Text span color="gray.6">
              By{" "}
            </Text>
            {capitalize(creator.username)}{" "}
            <Text span color="gray.6">
              {getTimeDiff(created_at)}
            </Text>
          </Text>
        </Stack>
      </Box>
    </Carousel.Slide>
  );
};
