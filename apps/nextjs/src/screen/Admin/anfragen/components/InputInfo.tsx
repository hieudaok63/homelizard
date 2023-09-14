import { cn } from "@homelizard/tailwind-config/utils";

import { PopoverIcon } from "./PopoverIcon";

interface IInputInfo {
  title: string;
  content:any;
  className?: string;
  infoUser?: boolean;
  persionData?: boolean;
  icon?: boolean;
  onClick?: () => void;
}

export const InputInfo = ({
  title,
  content,
  className,
  infoUser,
  persionData,
  icon,
}: IInputInfo) => (
  <div
    className={cn(
      "relative flex w-full border-b-[1px]",
      infoUser ? "py-1" : "py-2",
      persionData && "py-[1px]",
    )}
  >
    <p
      className={cn(
        "text-lg font-medium tracking-wider text-gray-400",
        infoUser ? "w-[35%]" : "w-[50%]",
      )}
    >
      {title}
    </p>
    <span className={className}>{content}</span>
    {icon && <PopoverIcon />}
  </div>
);
