import React from "react";
import Image, { type StaticImageData } from "next/image";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@homelizard/tailwind-config/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

interface StaticRequire {
  default: StaticImageData;
}
type StaticImport = StaticRequire | StaticImageData;
type ControlSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "render"> &
  Omit<SelectProps, "onChange" | "value"> & {
    options: {
      value: string;
      label: string;
    }[];
    label: string;
    placeholder?: string;
    labelClassName?: string;
    isIcon?: boolean;
    icon?: string | StaticImport;
    onIcon?: () => void;
  };

export const SelectProfile = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  options,
  label,
  placeholder = "Select a option",
  labelClassName,
  isIcon,
  icon,
  onIcon,
}: ControlSelectProps<TFieldValues, TName>) => (
  <div className="w-full">
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        return (
          <div className="flex w-full gap-2">
            <p
              className={cn(
                "w-[30%] whitespace-nowrap text-base capitalize text-placeholder",
                labelClassName,
              )}
            >
              {label}
            </p>
            <div className="flex w-full items-center gap-1 border-b border-b-gray-300">
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger
                  className={`h-10 w-full justify-start border-none text-left text-sm font-weight_600 ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 ${
                    value ? "text-black" : "text-gray-500"
                  }`}
                >
                  <SelectValue
                    className="text-left  font-weight_600 text-black placeholder:font-weight_600 placeholder:text-gray-600"
                    placeholder={placeholder}
                  />
                </SelectTrigger>
                <SelectGroup className="text-left text-black">
                  <SelectContent className="text-left">
                    {options.map((val, _) => (
                      <SelectItem
                        key={val.value}
                        className="text-left text-black"
                        value={val.value}
                      >
                        {val.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectGroup>
              </Select>
              {isIcon && icon && (
                <div
                  onClick={onIcon}
                  className="mr-3 cursor-pointer p-1 active:bg-slate-100"
                >
                  <Image src={icon} alt="not" className="h-full w-full" />
                </div>
              )}
            </div>
          </div>
        );
      }}
    />
  </div>
);
