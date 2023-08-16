import Image from "next/image";

import { ArrowRight } from "~/assets";

export default function UploadItem() {
  return (
    <div className="h-[100px] w-[315px] cursor-pointer items-center justify-between rounded-3xl bg-white px-3 py-5 transition-all duration-300 hover:bg-gray-200">
      <div className="flex items-center justify-between">
        <div className="h-[40px] w-[40px] rounded-s-full rounded-t-full border-2 border-gray-500"></div>
        <div>
          <h3 className="mb-1 text-base font-bold">Basti Salzman</h3>
          <div className="flex items-center justify-between">
            <p className="mr-2 rounded-full bg-[#E3CDBB] px-2 py-1 text-xs text-white">
              Family
            </p>
            <span className="text-xs text-[#828282D9]">
              Birthday: 25 Jun 2021
            </span>
          </div>
        </div>
        <div>
          <Image src={ArrowRight} alt="arrow-right" />
        </div>
      </div>
    </div>
  );
}
