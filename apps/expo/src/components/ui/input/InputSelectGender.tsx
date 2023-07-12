import React from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import {
  AppInputSelectGender,
  type AppInputSelectGenderProps,
} from "../AppInputSelectGender";

type TextInputGenderProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "render"> &
  Omit<
    AppInputSelectGenderProps,
    "onChangeText" | "value" | "onBlur" | "error"
  >;

const InputSelectGender = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  defaultValue,
  ...appInputProps
}: TextInputGenderProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
        <AppInputSelectGender
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

export default InputSelectGender;
