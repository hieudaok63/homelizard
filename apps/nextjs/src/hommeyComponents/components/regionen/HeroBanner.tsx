import { type ReactNode } from "react";
import Image from "next/image";

import bannerBig from "~/assets/imageMarketting/bannerBig.png";

export type HeroBannerProps = {
  title: string;
  descriptions?: string[];
  // buttonTitle: string;
  ActionButton?: ReactNode;
};

export default function HeroBanner({
  title,
  descriptions,
  // buttonTitle,
  ActionButton,
}: HeroBannerProps) {
  return (
    <div className="relative mb-6 h-[20rem] w-full rounded-xl md:h-auto">
      <Image
        src={bannerBig}
        alt="bannerBig"
        className="h-full w-full rounded-xl object-cover"
        width={1320}
        height={620}
      />
      <div className="absolute left-0 top-0 h-full w-full bg-white/30 pl-4 pt-4 xl:pl-16 xl:pt-32">
        <div>
          <h1 className="flex w-full flex-col text-3xl font-bold md:text-4xl lg:text-5xl xl:w-7/12">
            {title}
          </h1>

          <div className="mt-6 w-full xl:w-4/12">
            {descriptions?.map((item) => (
              <p className="text-base" key={item}>
                {item}
              </p>
            ))}
          </div>
        </div>

        {!!ActionButton ? ActionButton : null}
      </div>
    </div>
  );
}
