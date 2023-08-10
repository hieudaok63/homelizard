/* eslint-disable react/display-name */
import { forwardRef, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@homelizard/tailwind-config/utils";

import { Input, type InputProps } from "~/components";

type ControlTextInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "render"> &
  Omit<TextInputProps, "onChange" | "value" | "onBlur" | "error">;

interface StaticRequire {
  default: StaticImageData;
}
type StaticImport = StaticRequire | StaticImageData;

export interface TextInputProps extends InputProps {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  error?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  isIcon?: boolean;
  icon?: string | StaticImport;
  onIcon?: () => void;
}

const CustomInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const {
      label,
      value,
      onChange,
      placeholder,
      maxLength,
      error,
      style,
      autoCapitalize,
      className,
      labelClassName,
      inputClassName,
      errorClassName,
      isIcon,
      icon,
      onBlur,
      onIcon,
    } = props;
    const [isFocus, setFocus] = useState(false);
    const innerRef = useRef<HTMLInputElement | null>(null);
    return (
      <div className="w-full">
        <div className={cn(" flex w-full gap-2", className)} style={style}>
          <p
            className={cn(
              "w-[30%] whitespace-nowrap text-base capitalize text-placeholder",
              labelClassName,
            )}
          >
            {label}
          </p>
          <div className="flex w-full items-center gap-1 border-b border-b-[#ccc]">
            <Input
              ref={(node) => {
                innerRef.current = node;
                if (typeof ref === "function") {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              placeholder={!isFocus ? placeholder : undefined}
              className={cn(
                "w-full border-none px-0 text-font-16 font-weight_600 text-black",
                inputClassName,
              )}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={(e) => {
                setFocus(false);
                if (onBlur) onBlur(e);
              }}
              value={value}
              onChange={onChange}
              autoCapitalize={autoCapitalize}
              maxLength={maxLength}
            />
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
        {error && (
          <p className={` mt-1 text-red-700 ${errorClassName}`}>
            {error?.toString()}
          </p>
        )}
      </div>
    );
  },
);

export const CustomInputProfile = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  defaultValue,

  ...appInputProps
}: ControlTextInputProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
        <CustomInput
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error?.message}
          {...appInputProps}
        />
      )}
    />
  );
};
