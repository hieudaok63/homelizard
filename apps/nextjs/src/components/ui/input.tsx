import * as React from "react";

import { cn } from "@homelizard/tailwind-config/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "placeholder:text-muted-foreground round-lg flex h-10 w-full border-b-[1px] border-b-[#ebebeb] bg-transparent p-4 py-2 text-sm outline-none focus:border-b-[1px] focus:border-b-blue-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
