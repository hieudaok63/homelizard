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
    <View className="mt-2 flex w-full flex-row overflow-hidden p-2">
      <View className="w-2/12">{iconLeft}</View>
      <View className="w-9/12">
        <AppText text={title} className="text-font-24 pt-2" />
        <View className="mb-2 flex w-3/5 flex-row items-center">
          <View className="bg-text_yellow mr-2 rounded-full">
            <Text className="font-weight_500 p-1">Private</Text>
          </View>
          <AppText text="Filled" className="text-grey font-weight_700 mr-1" />
          <AppText text={`${progress}%`} className="text-blue_1" />
        </View>
        <View className="w-full">
          <StepProgress progress={progress} variant={variant} />
        </View>
      </View>
    </View>
  );
};
