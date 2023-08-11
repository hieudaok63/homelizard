import React from "react";
import { Text, View } from "react-native";

import { type ColorGradientVariant } from "~/utils/colorGradients";
import { StepProgress, type Percentage } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";

interface HeaderForm {
  title: string;
  progress: Percentage;
  iconLeft?: React.ReactNode;
  variant?: ColorGradientVariant;
}

export const HeaderForm = ({
  title,
  progress,
  iconLeft,
  variant,
}: HeaderForm) => {
  return (
    <View className="mt-2 flex w-full flex-row overflow-hidden px-4 py-2">
      <View className="mr-4">{iconLeft}</View>
      <View className="flex-1">
        <AppText text={title} className="pt-2 text-font-24" />
        <View className="mb-2 flex w-3/5 flex-row items-center">
          <View className="mr-2 rounded-full bg-text_yellow">
            <Text className="p-1 font-weight_500">Private</Text>
          </View>
          <AppText text="Filled" className="mr-1 font-weight_700 text-grey" />
          <AppText text={`${progress}%`} className="text-blue_1" />
        </View>
        <View className="w-full">
          <StepProgress progress={progress} variant={variant} />
        </View>
      </View>
    </View>
  );
};
