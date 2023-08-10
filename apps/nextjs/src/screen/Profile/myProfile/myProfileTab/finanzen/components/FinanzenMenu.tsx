import Image from "next/image";

import { cn } from "@homelizard/tailwind-config/utils";

import { ArrowRight } from "~/assets";
import { type TPersonalDataItem } from "~/types";

interface IProfileTabProps {
  data: TPersonalDataItem & { is_active?: boolean };
  className?: string;
  titleClassName?: string;
  percentClassName?: string;
  type?: "main" | "sub-main";
  isIcon?: boolean;
}

export default function FinanzenMenu(props: IProfileTabProps) {
  const { data, className } = props;

  return (
    <div className="relative flex h-20 w-full cursor-pointer items-center justify-between border-b-2 bg-white px-4 hover:bg-slate-100">
      <div className="flex items-center">
        <div className="mr-8 flex h-[60px] w-[60px] items-center justify-center rounded-s-full rounded-t-full border-2 bg-gray-200">
          <div className="flex h-[50px] w-[50px] items-center justify-center rounded-s-full rounded-t-full border-2 bg-blue_2"></div>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-medium">{data.title}</h3>
          <p className="text-xs font-semibold text-grey">
            {data.content + ","}
            <span className="text-green">
              {data.show_percent && data.percent + "%"}
            </span>
            {data.area + "m²"}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-28 h-2 w-[350px] rounded-se-lg rounded-ss-xl bg-slate-200">
        <div
          className={cn(
            "h-full max-w-full rounded-ss-xl",
            data.percent > 0
              ? `w-[${data.percent}%] ${data.color}`
              : "w-0 bg-slate-200",
            className,
          )}
        ></div>
      </div>
      <div className="rounded-full p-2 hover:bg-gray-300 active:bg-gray-200">
        <Image
          src={ArrowRight}
          alt=""
          className="h-6 w-6 cursor-pointer hover:scale-105"
        />
      </div>
    </div>
  );
}
