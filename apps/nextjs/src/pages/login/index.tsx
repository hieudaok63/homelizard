import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { at, lock, logoLogin } from "~/assets";
import OverLayLogin from "~/assets/imageMarketting/overlayLogin.png";
import { Button } from "~/components";
import { InputForm } from "~/hommeyComponents";

const searchPlaceList = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Find Your Perfect Place With Homelizard",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Find Your Perfect Place With Homelizard",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/2183521/pexels-photo-2183521.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Find Your Perfect Place With Homelizard",
  },
];

export default function Login() {
  return (
    <main className="grid grid-cols-2">
      <div className="relative hidden h-screen items-center justify-center bg-blue_6 xl:flex">
        <Image
          src={OverLayLogin}
          alt="overlay"
          className="absolute h-full w-full object-cover"
        />
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {searchPlaceList.map((searchPlaceItem) => (
            <SwiperSlide key={searchPlaceItem.id}>
              <div className="flex w-full flex-col items-center justify-center">
                <div className="h-[30rem] w-[20rem] overflow-hidden rounded-s-[3rem] rounded-t-[3rem] rounded-br-[0.5rem] 2xl:h-[36rem] 2xl:w-[26rem]">
                  <Image
                    src={searchPlaceItem.image}
                    alt="house"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-9 w-1/2 text-center text-3xl text-white 2xl:text-4xl">
                  {searchPlaceItem.title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="col-span-2 mx-auto flex h-screen w-10/12 flex-col items-center justify-center xl:col-span-1 2xl:w-8/12">
        <Image src={logoLogin} alt="" className="mb-3" />
        <p className="mb-2 text-3xl font-semibold">Welcome to Homelizard</p>
        <span className="w-2/3 text-center font-normal text-[#737D8C]">
          Welcome back! login with your data that you entered during
          registration.
        </span>
        <form className="w-full">
          <InputForm
            placeholder="Enter your email..."
            lable="Email adress"
            icon={at}
            className="mt-10"
          />
          <p className="mt-1 min-h-[2rem] text-sm text-red-600"></p>
          <InputForm placeholder="**********" lable="Password" icon={lock} />
          <Button className="mt-10 w-full bg-blue_6">LOGIN</Button>
        </form>
      </div>
    </main>
  );
}
