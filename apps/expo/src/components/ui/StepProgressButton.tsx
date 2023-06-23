import React from "react";
import { View } from "react-native";

import { Button } from "./Button";
import { StepProgress } from "./StepProgress";

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type T = Range<0, 101>;

interface IPropsStepProgressButton {
  title?: string;
  progress: T;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export const StepProgressButton = ({
  title,
  progress,
  label,
  disabled,
  onPress,
}: IPropsStepProgressButton) => {
  return (
    <View className="absolute bottom-[25px] left-0 right-0 px-12">
      <StepProgress progress={progress} />
      <Button
        title={title}
        onPress={onPress}
        className="rounded-[25px]"
        disabled={disabled}
      />
    </View>
  );
};
