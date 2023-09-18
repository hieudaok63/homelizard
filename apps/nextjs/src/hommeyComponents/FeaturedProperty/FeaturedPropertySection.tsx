// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import FeaturedPropertyItem from "./FeaturedPropertyItem";

const arrTest = Array.from(Array(8).keys());

const breakpoints = {
  576: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 3,
  },
};

export default function FeaturedPropertySection() {
  return (
    <Swiper
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
      breakpoints={breakpoints}
      autoplay
    >
      {arrTest.map((item) => (
        <SwiperSlide data-hash="featured-items" key={item}>
          <FeaturedPropertyItem />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
