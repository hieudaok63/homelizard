import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { api } from "~/utils/api";
import { Loading } from "~/components";
import {
  Conversation,
  FavoriteObjectItem,
  LinkProfileItem,
  UploadItem,
} from "./components";

const ArrTest = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

export default function Dashboard() {
  const { data, isLoading } = api.favorite.list.useQuery({
    page: 1,
    limit: 10,
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-24 w-screen bg-bg_home p-1 xl:w-auto xl:p-6">
          <div className="mb-10 flex items-center justify-between ">
            <h2 className="text-3xl text-pink ">Linked profiles</h2>
            <span className="cursor-pointer text-blue_1 hover:scale-105">
              See all
            </span>
          </div>
          <div className="mb-10">
            <Swiper
              slidesPerView={1.2}
              spaceBetween={30}
              modules={[Pagination]}
              className="mySwiper"
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                },
                768: {
                  slidesPerView: 2.3,
                },
                1024: {
                  slidesPerView: 3.5,
                },
              }}
            >
              {ArrTest.map((_, i) => (
                <SwiperSlide key={i}>
                  <LinkProfileItem />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mb-10">
            <h2 className="mb-8 text-3xl text-grey">Favorite objects</h2>
            <div className="mb-10">
              <Swiper
                slidesPerView={1.2}
                spaceBetween={30}
                modules={[Pagination]}
                className="mySwiper"
                breakpoints={{
                  640: {
                    slidesPerView: 1.5,
                  },
                  768: {
                    slidesPerView: 2.3,
                  },
                  1024: {
                    slidesPerView: 3.5,
                  },
                }}
              >
                {data?.map((item, i) => (
                  <SwiperSlide key={i}>
                    <FavoriteObjectItem data={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="mb-10">
            <h2 className="mb-8 text-3xl text-yellow-500">Conversations</h2>
            <Swiper
              slidesPerView={1.2}
              spaceBetween={30}
              modules={[Pagination]}
              className="mySwiper"
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                },
                768: {
                  slidesPerView: 2.3,
                },
                1024: {
                  slidesPerView: 3.5,
                },
              }}
            >
              {ArrTest.map((_, i) => (
                <SwiperSlide key={i}>
                  <Conversation />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mb-10">
            <div className="mb-10 flex items-center justify-between ">
              <h2 className="text-3xl text-purple ">Uploads</h2>
              <span className="cursor-pointer text-[#0080FF] hover:scale-105">
                See all
              </span>
            </div>
            <Swiper
              slidesPerView={1.2}
              spaceBetween={30}
              modules={[Pagination]}
              className="mySwiper"
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                },
                768: {
                  slidesPerView: 2.3,
                },
                1024: {
                  slidesPerView: 3.5,
                },
              }}
            >
              {ArrTest.map((_, i) => (
                <SwiperSlide key={i}>
                  <UploadItem />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}
