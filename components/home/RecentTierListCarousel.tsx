import { CSSObject } from "@mantine/core";
import { Carousel, CarouselProps } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRecentTierList } from "../../hooks/api/useRecentTierList";
import { CAROUSEL_SLIDE_SIZE } from "./styles";
import { AxiosError } from "axios";
import { CarouselSlide } from "./CarouselSlide";
import { TierListDisplayData } from "../../lib/types/tierlist";
import { useRef } from "react";
import { RecentTierListSkeleton } from "./RecentTierListSkeleton";

type Props = {
  data: TierListDisplayData[] | undefined;
  isError: boolean;
  error: unknown;
  isLoading: boolean;
};

export const carouselSx = (): CSSObject => ({
  margin: "0 auto",
});

export const RecentTierListCarousel = ({
  data,
  isError,
  error,
  isLoading,
}: Props) => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

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
    plugins: [autoplay.current],
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
