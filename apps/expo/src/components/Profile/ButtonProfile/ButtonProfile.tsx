import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";

import ArrowRightIcon from "@assets/icons/ArrowRightIcon.svg";

import { type ColorGradientVariant } from "~/utils/colorGradients";
import {
  ButtonActionMain,
  SpeechBubbleIcon,
  type Percentage,
} from "~/components/ui";

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
  style?: StyleProp<ViewStyle>;
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
  style,
}: IButtonProfile) => {
  return (
    <ButtonActionMain
      onPress={onPress}
      title={title}
      IconLeftProps={IconLeftProps}
      IconRightProps={IconRightProps}
      description={description}
      classButton="border-gray-200 border-t"
      progress={progress}
      variant={variant}
      isButton={styleBoxShadowBtn}
      style={style}
    />
  );
};
