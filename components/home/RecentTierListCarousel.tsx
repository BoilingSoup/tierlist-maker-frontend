import { CSSObject } from "@mantine/core";
import { Carousel, CarouselProps } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { CAROUSEL_SLIDE_SIZE } from "./styles";
import { CarouselSlide } from "./CarouselSlide";
import { TierListDisplayData } from "../../lib/types/tierlist";
import { useRef } from "react";
import { RecentTierListSkeleton } from "./RecentTierListSkeleton";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

type Props = {
  data: TierListDisplayData[] | undefined;
  isError: boolean;
  error: unknown;
  isLoading: boolean;
};

export const carouselSx = (): CSSObject => ({
  margin: "0 auto",
});

export const RecentTierListCarousel = ({ data, isError, error, isLoading }: Props) => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const wheelGestures = useRef(WheelGesturesPlugin());

  if (isLoading) {
    return <RecentTierListSkeleton />;
  }

  // if (isError && error instanceof AxiosError) {
  //   return <Text sx={carouselErrorSx}>{error.message}</Text>;
  // }

  const carouselProps: CarouselProps = {
    align: "center",
    slideSize: CAROUSEL_SLIDE_SIZE,
    slideGap: "lg",
    loop: true,
    plugins: [autoplay.current, wheelGestures.current],
    onMouseEnter: autoplay.current.stop,
    onMouseLeave: autoplay.current.reset,
    withControls: false,
  };

  return (
    <Carousel sx={carouselSx} {...carouselProps}>
      {data?.map((tierList: TierListDisplayData) => {
        return <CarouselSlide key={tierList.id} data={tierList} />;
      })}
    </Carousel>
  );
};
