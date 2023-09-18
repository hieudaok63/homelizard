import Image from "next/image";

import { bedRoom, heartWhite, map, shower } from "~/assets/iconsMarketting";

export default function RecentPropertyItem() {
  return (
    <div className="w-full cursor-pointer rounded-lg shadow-md">
      <div className="relative overflow-hidden rounded-sm">
        <Image
          src="https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          width={312}
          height={195}
          className="w-full object-cover duration-200 hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex items-center justify-center rounded-sm bg-white p-1 shadow-sm shadow-gray-500">
          <span className="text-xs font-semibold">For sale</span>
        </div>
        <Image
          src={heartWhite}
          alt=""
          className="absolute right-2 top-2 shadow-lg"
        />
      </div>
      <div className="p-6 pt-2">
        <p className="mb-4 mt-2 text-base font-semibold">
          The Most Luxarious House
        </p>
        <div className="mb-3 flex items-center">
          <Image src={map} alt="" className="" />
          <span className="ml-1 text-sm font-normal text-grey_4">
            4059 Waterview Texico, NM 88135
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src={bedRoom} alt="" className="mr-2" />
            <span className="text-sm font-normal text-grey_4">3 Bedroom</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-grey_4"></div>
          <div className="flex items-center ">
            <Image src={shower} alt="" className="mr-2 " />
            <span className="text-sm font-normal text-grey_4">2 Bathroom</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t-2 pt-3">
          <span className="text-lg font-bold text-blue_6">$1,560</span>
          <button className="rounded-md bg-grey_5 px-4 py-2 duration-200 hover:bg-grey_4 hover:text-white">
            View More
          </button>
        </div>
      </div>
    </div>
  );
}
