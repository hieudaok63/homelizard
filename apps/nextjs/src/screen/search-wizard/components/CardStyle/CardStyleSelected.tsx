import Image from "next/image";

import { cn } from "@homelizard/tailwind-config/utils";

import { type ObjectStyleItem } from "./CardStyle";

type IProps = {
  data: ObjectStyleItem;
  className?: string;
};

export const CardStyleSelected = ({ data, className }: IProps) => {
  return (
    <>
      <div
        className={cn(
          "w-full cursor-pointer overflow-hidden rounded-3xl transition-all duration-300 hover:scale-95",
          className,
        )}
      >
        <div className="h-full w-full">
          <Image
            width={500}
            height={500}
            src={data?.imageUrl}
            alt={data.id}
            className="h-full w-full"
          />
        </div>
        <div className="h-auto bg-white">
          <div className="p-3">
            <p className="w-full py-2 text-center text-lg font-bold">
              {data?.title}
            </p>
            <p className="line-clamp-6 min-h-[120px] flex-1 text-sm text-grey_2">
              {data?.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
