import { Carousel } from "@mantine/carousel";
import { Image, Text, Stack, Box } from "@mantine/core";
import Link from "next/link";
import { TierListDisplayData } from "../../lib/types/tierlist";
import { capitalize, getTimeDiff } from "../common/helpers";
import { titleCase } from "../tierlist/helpers";
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
  const { creator, thumbnail, updated_at } = data;

  return (
    <Carousel.Slide sx={carouselSlideSx}>
      <Box component={Link} href={`/tierlist/${data.id}`} sx={{ textDecoration: "none" }}>
        <Box sx={carouselSlideWrapperSx}>
          <Text
            component="h4"
            sx={{
              fontSize: "clamp(1rem, 6vw, 1.5rem)",
              color: "white",
              marginTop: "1ch",
              textAlign: "center",
            }}
          >
            {titleCase(data.title)}
          </Text>
          <Image src={thumbnail} alt="tier list thumbnail" radius={CAROUSEL_THUMBNAIL_BORDER_RADIUS} />
          <Stack sx={carouselSlideStackSx}>
            <Text mt="xl">
              <Text span color="gray.6">
                By{" "}
              </Text>
              {capitalize(creator.username)}{" "}
              <Text span color="gray.6">
                {getTimeDiff(updated_at)}
              </Text>
            </Text>
          </Stack>
        </Box>
      </Box>
    </Carousel.Slide>
  );
};
