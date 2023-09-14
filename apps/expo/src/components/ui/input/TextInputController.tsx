import React from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues
} from "react-hook-form";

import { InputDefault } from "./variants/InputDefault";
import { InputFlex } from "./variants/InputFlex";
import { InputInline } from "./variants/InputInline";
import { type AppInputProps } from "./variants/types";

type TextInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "render"> &
  Omit<AppInputProps, "onChangeText" | "value" | "onBlur" | "error"> & {
    variant?: "default" | "inline" | "flex";
  };

const TextInputController = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  defaultValue,
  variant,
  ...appInputProps
}: TextInputProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        if (variant === "inline") {
          return (
            <InputInline
              value={value}
              onChangeText={onChange}
              error={error?.message}
              {...appInputProps}
            />
          );
        }
        if (variant === "flex") {
          return (
            <InputFlex
              value={value}
              onChangeText={onChange}
              error={error?.message}
              {...appInputProps}
            />
          );
        }
        // default
        return (
          <InputDefault
            value={value}
            onChangeText={onChange}
            error={error?.message}
            {...appInputProps}
          />
        );
      }}
    />
  );
};

export default TextInputController;
