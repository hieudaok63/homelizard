// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import ClientSayItem from "./ClientSayItem";

const arrTest = Array.from(Array(8).keys());

const breakpoints = {
  576: {
    // width: 576,
    slidesPerView: 2,
  },
  768: {
    // width: 768,
    slidesPerView: 3,
  },
};

export default function ClientSaySection() {
  return (
    <Swiper
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Autoplay, Pagination]}
      className="mySwiper"
      navigation={true}
      autoplay
      // slidesPerView={3}
      breakpoints={breakpoints}
    >
      {arrTest.map((item) => (
        <SwiperSlide data-hash="featured-items" key={item}>
          <ClientSayItem />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
