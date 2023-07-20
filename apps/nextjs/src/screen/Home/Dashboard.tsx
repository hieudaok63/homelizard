import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import {
  Conversation,
  FavoriteObjectItem,
  LinkProfileItem,
  UploadItem,
} from "./components";

const ArrTest = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

export default function Dashboard() {
  return (
    <div className="mt-24 p-4">
      <div className="mb-10 flex items-center justify-between ">
        <h2 className="text-3xl text-[#E681A0] ">Linked profiles</h2>
        <span className="cursor-pointer text-[#0080FF] hover:scale-105">
          See all
        </span>
      </div>
      <div className="mb-10">
        <Swiper
          slidesPerView={3.2}
          spaceBetween={30}
          modules={[Pagination]}
          className="mySwiper"
        >
          {ArrTest.map((_, i) => (
            <SwiperSlide key={i}>
              <LinkProfileItem />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mb-10">
        <h2 className="mb-8 text-3xl text-[#828282D9]">Favorite objects</h2>
        <div className="mb-10">
          <Swiper
            slidesPerView={3.5}
            spaceBetween={30}
            modules={[Pagination]}
            className="mySwiper"
          >
            {ArrTest.map((_, i) => (
              <SwiperSlide key={i}>
                <FavoriteObjectItem />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="mb-10">
        <h2 className="mb-8 text-3xl text-yellow-400">Conversations</h2>
        <Swiper
          slidesPerView={3.5}
          spaceBetween={30}
          modules={[Pagination]}
          className="mySwiper"
        >
          {ArrTest.map((_, i) => (
            <SwiperSlide key={i}>
              <Conversation />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mb-14">
        <div className="mb-10 flex items-center justify-between ">
          <h2 className="text-3xl text-purple ">Uploads</h2>
          <span className="cursor-pointer text-[#0080FF] hover:scale-105">
            See all
          </span>
        </div>
        <Swiper
          slidesPerView={3.2}
          spaceBetween={30}
          modules={[Pagination]}
          className="mySwiper"
        >
          {ArrTest.map((_, i) => (
            <SwiperSlide key={i}>
              <UploadItem />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
