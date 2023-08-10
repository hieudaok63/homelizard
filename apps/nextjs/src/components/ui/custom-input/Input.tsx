/* eslint-disable react/display-name */

import React, { forwardRef, useRef, useState } from "react";

import { cn } from "@homelizard/tailwind-config/utils";

import { Input, type InputProps } from "../input";

export interface TextInputProps extends InputProps {
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  error?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

export const CustomInput = forwardRef<HTMLInputElement, TextInputProps>(
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
      onBlur,
      type,
    } = props;
    const [isFocus, setFocus] = useState(false);
    const innerRef = useRef<HTMLInputElement | null>(null);
    return (
      <div
        className="relative w-full"
        onClick={() => innerRef.current?.focus()}
      >
        <div className={cn("relative transition-all", className)} style={style}>
          {!!label && (
            <p
              className={cn(
                "absolute -top-4 text-base capitalize text-placeholder",
                labelClassName,
              )}
            >
              {(isFocus || value) && label}
            </p>
          )}
          <div className="relative">
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
                "text-font-16 font-weight_600 text-black",
                inputClassName,
              )}
              onFocus={() => {
                setFocus(true);
                // if (onFocusCallback) onFocusCallback();
              }}
              onBlur={(e) => {
                setFocus(false);
                if (onBlur) onBlur(e);
              }}
              value={value}
              onChange={onChange}
              autoCapitalize={autoCapitalize}
              maxLength={maxLength}
              type={type}
            />
          </div>
        </div>
        {error && (
          <p className={`absolute left-0 mt-1 text-red-700 ${errorClassName}`}>
            {error?.toString()}
          </p>
        )}
      </div>
    );
  },
);
