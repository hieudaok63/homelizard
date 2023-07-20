import Image from "next/image";



import { cn } from "@homelizard/tailwind-config/utils";

import { Warning } from "~/assets";
import { type TCardStyle } from "~/types";

export const ObjectStyleCard = ({
  data,
  className,
  chooseStyle,
}: TCardStyle) => {
  return (
    <div
      className={cn(
        "relative h-[320px] w-full  cursor-pointer rounded-3xl hover:shadow-2xl",
        className,
      )}
      onClick={chooseStyle}
    >
      <div className="h-full w-full">
        <Image
          width={1000}
          height={500}
          src={data?.image ?? ""}
          alt="Bohemian"
          className="h-full w-full rounded-3xl"
        />
      </div>
      <div className="min-h-14 xxl:w-[300px] absolute bottom-4 left-[50%] flex w-[150px] -translate-x-[50%] items-center justify-between overflow-hidden rounded-full  bg-white px-4 py-3 xl:w-[250px]">
        <div className="w-[90%] overflow-hidden">
          <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold">
            {data?.title}
          </p>
          <p className="line-clamp-3 flex-1 whitespace-pre-line text-xs text-grey_2">
            {data?.content}
          </p>
        </div>
        <div className="w-[10%]">
          <Warning color={data?.is_check ? "#3BAF55" : "#000"} />
        </div>
      </div>
    </div>
  );
};