import React from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { AppInputProfile, type AppInputProfileProps } from "../AppInputProfile";

type TextInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "render"> &
  Omit<AppInputProfileProps, "onChangeText" | "value" | "onBlur" | "error">;

const InputProfile = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  defaultValue,
  ...appInputProps
}: TextInputProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
        <AppInputProfile
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          {...appInputProps}
        />
      )}
    />
  );
};

export default InputProfile;
