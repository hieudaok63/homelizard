import React from "react";
import { View } from "react-native";

import { type ColorGradientVariant } from "~/utils/colorGradients";
import { Button } from "./Button";
import { StepProgress, type Percentage } from "./StepProgress";

interface IPropsStepProgressButton {
  title?: string;
  progress: Percentage;
  onPress?: () => void;
  disabled?: boolean;
  variant?: ColorGradientVariant;
}

export const StepProgressButton = ({
  title,
  progress,
  disabled,
  onPress,
  variant,
}: IPropsStepProgressButton) => {
  return (
    <View className="absolute bottom-[25px] left-0 right-0 px-12 ">
      <View className="mx-6">
        <StepProgress progress={progress} variant={variant} />
      </View>
      <Button
        title={title}
        onPress={onPress}
        className="rounded-[25px]"
        disabled={disabled}
      />
    </View>
  );
};
