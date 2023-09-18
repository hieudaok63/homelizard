import Image from "next/image";

import { CircleEffect } from "~/assets/iconsMarketting";

interface IImageBorder {
  url: string;
}

export default function ImageBorder({ url }: IImageBorder) {
  return (
    <div className="relative h-full w-full rounded-[5px] xl:h-[36.563rem] xl:w-[33.5rem]">
      <Image
        src={url}
        alt=""
        width={500}
        height={500}
        className="h-full w-full rounded-[5px]"
      />
      <div className="absolute bottom-9 left-[1.375rem] hidden h-full w-full rounded-[6px] border-[1px] border-[#1252ae33] sm:block "></div>
      <Image
        src={CircleEffect}
        alt=""
        className="absolute bottom-[-20%] left-[-20%]"
      />
    </div>
  );
}
