import Image from "next/image";

import { ArrowRight } from "~/assets";

export default function LinkProfileItem() {
  return (
    <div className=" h-[100px] w-[315px] cursor-pointer items-center justify-between rounded-3xl bg-white px-8 py-5 transition-all duration-300 hover:bg-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue_1 text-xs text-white">
          2
        </div>
        <div>
          <h3 className="mb-1 text-base font-bold">Basti Salzman</h3>
          <div className="flex items-center justify-between">
            <p className="mr-2 rounded-full bg-orange-100 px-2 py-1 text-xs text-white">
              Family
            </p>
            <span className="text-gray text-xs">Birthday: 25 Jun 2021</span>
          </div>
        </div>
        <div>
          <Image src={ArrowRight} alt="arrow-right" />
        </div>
      </div>
    </div>
  );
}
