import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";

import {
  Ellipse,
  houseTest1,
  houseTest2,
  houseTest3,
  houseTest4,
  houseTest5,
} from "~/assets/iconsMarketting";

const FederalList = [
  {
    id: 1,
    icon: houseTest1,
    title: "Private House",
    list: 360,
  },
  {
    id: 2,
    icon: houseTest2,
    title: "Apartment",
    list: 265,
  },
  {
    id: 3,
    icon: houseTest3,
    title: "Exclusive Mansion",
    list: 480,
  },
  {
    id: 4,
    icon: houseTest4,
    title: "Private Room",
    list: 102,
  },
  {
    id: 5,
    icon: houseTest5,
    title: "Warehouse",
    list: 136,
  },
  {
    id: 6,
    icon: houseTest1,
    title: "Private House",
    list: 360,
  },
  {
    id: 7,
    icon: houseTest5,
    title: "Warehouse",
    list: 136,
  },
];

const slideBreakPoints = {
  0: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 40,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 50,
  },
  1366: {
    slidesPerView: 5,
    spaceBetween: 20,
  },
};

export default function FederalStates() {
  return (
    <div className="flex justify-between">
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        breakpoints={slideBreakPoints}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        autoplay
      >
        {FederalList.map((FederalItem) => (
          <SwiperSlide key={FederalItem.id}>
            <div className="flex flex-col items-center justify-center pb-12">
              <div className="relative mb-4 flex h-[100px] w-[100px] items-center justify-center">
                <Image src={Ellipse} alt="" className="h-full w-full" />
                <Image src={FederalItem.icon} alt="" className="absolute" />
              </div>
              <p className="mb-3 text-[22px] font-semibold">
                {FederalItem.title}
              </p>
              <div className="flex h-[26px] w-[104px] items-center justify-center rounded-full bg-[#EBEEF2] text-sm font-normal shadow-[0px_2px_1px_0px_rgba(36,_45,_60,_0.20)]">
                {`${FederalItem.list} Listing`}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
