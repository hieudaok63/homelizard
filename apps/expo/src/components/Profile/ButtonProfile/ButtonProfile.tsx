import React from "react";

import { cn } from "@homelizard/tailwind-config/utils";

import ArrowRightIcon from "@assets/icons/ArrowRightIcon.svg";
import DefaultYellowIcon from "@assets/icons/DefaultYellowIcon.svg";

import { type ColorGradientVariant } from "~/utils/colorGradients";
import { ButtonActionMain, type Percentage } from "~/components/ui";

interface IButtonProfile {
  onPress: () => void;
  onPressIconRight: () => void;
  title: string;
  description: string;
  progress: Percentage;
  variant: ColorGradientVariant;
  styleBoxShadowBtn?: boolean;
  IconLeftProps?: React.ReactNode;
  IconRightProps?: React.ReactNode;
  lastItemButton?: boolean;
  firstItemButton?: boolean;
}

export const ButtonProfile = ({
  onPress,
  onPressIconRight,
  title,
  description,
  progress,
  variant,
  styleBoxShadowBtn,
  IconLeftProps = <DefaultYellowIcon />,
  IconRightProps = <ArrowRightIcon fill="#000000" />,
  lastItemButton,
  firstItemButton,
}: IButtonProfile) => {
  return (
    <ButtonActionMain
      onPress={onPress}
      title={title}
      IconLeftProps={IconLeftProps || <DefaultYellowIcon />}
      IconRightProps={IconRightProps}
      isProgressbar
      onPressIconRight={onPressIconRight}
      classButton={cn(
        "rounded-none border-y border-color_gray",
        lastItemButton && "rounded-b-[40px]",
        firstItemButton && "rounded-t-[40px]",
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
