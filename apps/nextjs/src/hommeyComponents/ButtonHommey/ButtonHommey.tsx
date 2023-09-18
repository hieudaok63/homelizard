import Image from "next/image";

import { cn } from "@homelizard/tailwind-config/utils";

import { arrowRightBig, arrowRightThin } from "~/assets";
import { Button } from "~/components";

interface IPropsButton {
  text: string;
  big?: boolean;
  className?: string;
  icon?: boolean;
  onClick?: () => void;
}

export default function ButtonHommey({
  text,
  big,
  className,
  icon,
  onClick,
}: IPropsButton) {
  return (
    <Button
      className={cn(
        "flex items-center rounded-sm bg-[#1252AE] shadow-sm shadow-slate-400 hover:bg-[#1253aef1]",
        big ? "h-10 w-80 sm:h-16 sm:w-[31.25rem] 3xl:w-[37.5rem]" : "h-9 w-28",
        className,
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          "font-normal",
          big ? "text-xs sm:text-lg 3xl:text-2xl" : "text-base",
        )}
      >
        {text}
      </span>
      {big && icon && (
        <Image
          src={arrowRightBig}
          alt=""
          className="ml-4 w-8 sm:w-10 3xl:w-16"
        />
      )}
      {!big && icon && <Image src={arrowRightThin} alt="" className="ml-1" />}
    </Button>
  );
}
