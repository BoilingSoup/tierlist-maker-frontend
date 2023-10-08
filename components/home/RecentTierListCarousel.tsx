import { Carousel, CarouselProps } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { carouselSx, CAROUSEL_SLIDE_SIZE } from "./styles";
import { CarouselSlide } from "./CarouselSlide";
import { TierListDisplayData } from "../../lib/types/tierlist";
import { useRef } from "react";
import { RecentTierListSkeleton } from "./RecentTierListSkeleton";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

type Props = {
  data: TierListDisplayData[] | undefined;
  isLoading: boolean;
};

export const RecentTierListCarousel = ({ data, isLoading }: Props) => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const wheelGestures = useRef(WheelGesturesPlugin());

  if (isLoading) {
    return <RecentTierListSkeleton />;
  }

  const carouselProps: CarouselProps = {
    align: "center",
    slideSize: CAROUSEL_SLIDE_SIZE,
    slideGap: "xl",
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
