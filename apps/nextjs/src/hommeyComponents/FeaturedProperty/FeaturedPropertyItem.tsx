import Image from "next/image";

// Import Swiper React components

import { map, star } from "~/assets/iconsMarketting";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function FeaturedPropertyItem() {
  return (
    <div className="cursor-pointer rounded-sm bg-white p-6 pb-10 shadow-md">
      <div className="mb-5 overflow-hidden rounded-sm">
        <Image
          src="https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          width={500}
          height={500}
          className="object-cover duration-200 hover:scale-105"
        />
      </div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-lg font-semibold">
          A Modern House Accentuates
        </span>
        <span className="flex items-center justify-center rounded-sm bg-green_3/20 px-2 py-1 text-xs font-semibold text-green_3">
          For sale
        </span>
      </div>
      <div className="mb-4 flex items-center">
        <Image src={map} alt="location" className="mr-2 w-5" />
        <span className="text-sm font-normal text-grey_4">
          4059 Waterview Texico, NM 88135
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <Image src={star} alt="" />
          <Image src={star} alt="" />
          <Image src={star} alt="" />
          <Image src={star} alt="" />
          <Image src={star} alt="" />
        </div>
        <span className="text-[20px] font-bold">$850</span>
      </div>
    </div>
  );
}
