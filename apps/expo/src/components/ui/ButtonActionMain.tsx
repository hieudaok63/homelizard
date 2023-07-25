import React from "react";
import { TouchableOpacity, View } from "react-native";

import { cn } from "@homelizard/tailwind-config/utils";

import { type ColorGradientVariant } from "~/utils/colorGradients";
import { generateBoxShadowStyle } from "~/utils/helpers";
import { AppText } from "./AppText";
import { SpeechBubbleIcon } from "./SpeechBubbleIcon";
import { StepProgress, type Percentage } from "./StepProgress";

export const styleBoxShadow = generateBoxShadowStyle("shadowBtn");

interface ButtonActionProps {
  title: string;
  progress: Percentage;
  variant?: ColorGradientVariant;
  isFill?: boolean;
  isProgressbar?: boolean;
  IconRightProps?: React.ReactNode;
  IconLeftProps?: React.ReactNode;
  description?: string;
  styleBoxShadowBtn?: boolean;
  classButton?: string;
  classTitleButton?: string;
  activeOpacity?: number;
  onPress: () => void;
  onPressIconRight?: () => void;
}

export const ButtonActionMain = ({
  title,
  isFill,
  isProgressbar,
  IconRightProps,
  description,
  IconLeftProps,
  progress,
  variant = "blue",
  styleBoxShadowBtn = false,
  classButton,
  classTitleButton,
  activeOpacity,
  onPress,
}: ButtonActionProps) => {
  return (
    <View className="items-center justify-center">
      <TouchableOpacity
        className={`flex w-full flex-row items-center rounded-full bg-white px-2 py-[8px] ${classButton}`}
        style={styleBoxShadowBtn && [styleBoxShadow]}
        onPress={onPress}
        activeOpacity={activeOpacity}
      >
        {IconLeftProps && (
          <SpeechBubbleIcon color={variant}>{IconLeftProps}</SpeechBubbleIcon>
        )}

        {/* <SpeechBubbleIcon /> */}
        <View className="w-full pb-2 pl-4">
          <AppText
            text={title}
            className={cn("font-nunito-bold text-lg", classTitleButton)}
          />
          {isFill && (
            <View className="flex flex-row">
              <AppText text="Filled" className="mr-1 text-grey" />
              <AppText text={`${progress}%`} className="text-blue_1" />
            </View>
          )}
          {description && (
            <View className="mt-1 flex flex-row">
              <AppText text={description} className="text-grey" />
            </View>
          )}
        </View>

        {/* TODO: get rid of embedded touchableOpacity  */}
        {IconRightProps && (
          <TouchableOpacity
            onPress={onPress}
            className="absolute right-1 top-1 p-2"
          >
            {IconRightProps}
          </TouchableOpacity>
        )}
        {progress !== null && isProgressbar && (
          <View className="absolute bottom-0 left-12 right-0 w-5/6">
            <StepProgress progress={progress} variant={variant} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
