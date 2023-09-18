import { cn } from "@homelizard/tailwind-config/utils";

interface ITitleSeparate {
  reverse?: boolean;
  titleFirst?: string;
  titleSecond?: string;
  className?: string;
}

export default function TitleSeparate({
  reverse,
  titleFirst,
  titleSecond,
  className,
}: ITitleSeparate) {
  return (
    <div className={className}>
      <div className="flex gap-2 text-2xl font-bold sm:text-3xl 3xl:text-4xl">
        <span className={cn("", reverse ? "text-[#2A323C]" : "text-[#1252AE]")}>
          {titleFirst}
        </span>
        <span className={cn("", reverse ? "text-[#1252AE]" : "text-[#2A323C]")}>
          {titleSecond}
        </span>
      </div>
      <div className="mt-2 flex items-center">
        <div className="mr-4 h-[1px] w-36 bg-[#2A323C]"></div>
        <div className="mr-4 h-[1px] w-12 bg-[#1252AE80]"></div>
        <div className="mr-4 h-[1px] w-3 bg-[#1252AE40]"></div>
      </div>
    </div>
  );
}
