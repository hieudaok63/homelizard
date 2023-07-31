import React from "react";
import {
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { cn } from "@homelizard/tailwind-config/utils";

import { ArrowRightIcon } from "@assets/icons";

import { type ColorGradientVariant } from "~/utils/colorGradients";
import { generateBoxShadowStyle } from "~/utils/helpers";
import { AppText } from "./AppText";
import { SpeechBubbleIcon } from "./SpeechBubbleIcon";
import { StepProgress, type Percentage } from "./StepProgress";

export const styleBoxShadow = generateBoxShadowStyle("shadowBtn");

interface ButtonActionProps {
  title: string;
  description?: string;
  isButton?: boolean;
  variant?: ColorGradientVariant;
  noSpeechBubbleIcon?: boolean;
  IconLeftProps?: React.ReactNode;
  progress?: Percentage;
  IconRightProps?: React.ReactNode;
  classButton?: string;
  classTitleButton?: string;
  activeOpacity?: number;
  onPress: () => void;
  // required to allow nativewind gap/spacing to work
  style?: StyleProp<ViewStyle>;
}

export const ButtonActionMain = ({
  title,
  description,
  isButton,
  progress,
  noSpeechBubbleIcon,
  IconLeftProps,
  IconRightProps = <ArrowRightIcon fill="#000000" />,
  variant = "blue",
  classButton,
  classTitleButton,
  onPress,
  style,
}: ButtonActionProps) => {
  return (
    <TouchableOpacity
      className={cn(
        "flex w-full flex-row items-center justify-between bg-white",
        isButton && "rounded-full",
        classButton,
      )}
      style={[style, isButton && styleBoxShadow]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <OverridableSpeechBubbleIcon
        noSpeechBubbleIcon={noSpeechBubbleIcon}
        IconLeftProps={IconLeftProps}
        variant={variant}
      />

      <View className="flex-1 px-2">
        <AppText
          text={title}
          numberOfLines={1}
          className={cn(
            "text-[18px]",
            // if there is no second row of text change line height to center text properly
            !description && progress === undefined && "leading-7",
            isButton && "font-nunito-bold",
            classTitleButton,
          )}
        />
        {!description && progress !== undefined && (
          <View className="flex flex-row">
            <AppText
              text="Filled"
              className="mr-1 text-xs leading-4 text-grey"
            />
            <AppText
              text={`${progress}%`}
              className="text-xs leading-4 text-blue_1"
            />
          </View>
        )}
        {description && (
          <AppText
            text={description}
            className="leading-4 text-grey"
            numberOfLines={1}
          />
        )}
      </View>

      <View className="p-5">{IconRightProps}</View>
      {progress !== undefined && (
        <View className="absolute bottom-0 w-full px-[72px]">
          <StepProgress progress={progress} variant={variant} />
        </View>
      )}
    </TouchableOpacity>
  );
};

type OverridableSpeechBubbleIconProps = {
  variant: ColorGradientVariant;
  noSpeechBubbleIcon?: boolean;
  IconLeftProps?: React.ReactNode;
};

const OverridableSpeechBubbleIcon = ({
  noSpeechBubbleIcon,
  variant,
  IconLeftProps,
}: OverridableSpeechBubbleIconProps) => {
  return (
    <>
      {noSpeechBubbleIcon ? (
        IconLeftProps && <View className="p-2">{IconLeftProps}</View>
      ) : (
        <View className="p-2">
          <SpeechBubbleIcon color={variant}>{IconLeftProps}</SpeechBubbleIcon>
        </View>
      )}
    </>
  );
};
