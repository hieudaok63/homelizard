import React from "react";
import Image from "next/image";

import { cn } from "@homelizard/tailwind-config/utils";

import { Warning } from "~/assets";
import { type TCardStyle } from "~/types";

export const CardStyleSelected = ({ data, className }: TCardStyle) => {
  return (
    <div
      className={cn(
        "flex h-[100px] w-full cursor-pointer  justify-start rounded-3xl bg-white transition hover:bg-slate-200",
        className,
      )}
    >
      <div className="h-full max-w-[200px]">
        <Image
          width={1000}
          height={500}
          src={data?.image ?? ""}
          alt="Bohemian"
          className="h-full w-full rounded-3xl"
        />
      </div>
      <div className="ml-6 flex w-full justify-between overflow-hidden px-4 py-3">
        <div className="w-[90%] overflow-hidden">
          <p className="line-clamp-3 w-full text-ellipsis whitespace-nowrap text-lg font-bold">
            {data?.title}
          </p>
          <p className="mt-2 line-clamp-3 flex-1 whitespace-pre-line text-sm text-grey_2">
            {data?.content}
          </p>
        </div>
        <div className="flex w-[10%] items-center pl-4">
          <Warning color={data?.is_check ? "#3BAF55" : "#000"} />
        </div>
      </div>
    </div>
  );
};
