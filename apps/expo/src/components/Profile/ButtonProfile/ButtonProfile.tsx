import React from "react";

import { cn } from "@homelizard/tailwind-config/utils";

import ArrowRightIcon from "@assets/icons/ArrowRightIcon.svg";

import { type ColorGradientVariant } from "~/utils/colorGradients";
import { ButtonActionMain, SpeechBubbleIcon, type Percentage } from "~/components/ui";

interface IButtonProfile {
  onPress: () => void;
  title: string;
  description: string;
  progress: Percentage;
  variant: ColorGradientVariant;
  styleBoxShadowBtn?: boolean;
  IconLeftProps?: React.ReactNode;
  IconRightProps?: React.ReactNode;
  isLastItem?: boolean;
  isFirstItem?: boolean;
}

export const ButtonProfile = ({
  onPress,
  title,
  description,
  progress,
  variant,
  styleBoxShadowBtn,
  IconLeftProps = <SpeechBubbleIcon color="yellow" />,
  IconRightProps = <ArrowRightIcon fill="#000000" />,
  isLastItem,
  isFirstItem,
}: IButtonProfile) => {
  return (
    <ButtonActionMain
      onPress={onPress}
      title={title}
      IconLeftProps={IconLeftProps}
      IconRightProps={IconRightProps}
      isProgressbar
      classButton={cn(
        "rounded-none border-y border-color_gray",
        isLastItem && "rounded-b-[40px]",
        isFirstItem && "rounded-t-[40px]",
      )}
      description={description}
      classTitleButton="font-weight_400"
      activeOpacity={0.8}
      progress={progress}
      variant={variant}
      styleBoxShadowBtn={styleBoxShadowBtn}
    />
  );
};
