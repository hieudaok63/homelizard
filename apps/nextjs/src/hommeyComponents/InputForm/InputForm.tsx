import Image from "next/image";

import { cn } from "@homelizard/tailwind-config/utils";

import { Input } from "~/components";

interface IInputProps {
  lable: string;
  placeholder: string;
  icon?: any;
  onClick?: () => void;
  className?: string;
}

export default function InputForm({
  lable,
  icon,
  placeholder,
  onClick,
  className,
}: IInputProps) {
  return (
    <div className={cn("w-full", className)}>
      <p className="mb-[10px] text-[15px] font-semibold text-[#737D8C]">
        {lable}
      </p>
      <div className="relative h-12 w-full rounded-sm">
        <Input
          className="h-full w-full rounded-sm border-[1px] pl-5  text-[15px]"
          placeholder={placeholder}
        />
        <Image
          src={icon}
          alt=""
          className="absolute bottom-[26%] right-3"
          onClick={onClick}
        />
      </div>
    </div>
  );
}
