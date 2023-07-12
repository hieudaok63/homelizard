import React from "react";
import { TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import CrossIcon from "@assets/icons/CrossIcon.svg";

import {
  colorGradients,
  type ColorGradientVariant,
} from "~/utils/colorGradients";
import { AppText } from "./AppText";
import { ButtonActionMain } from "./ButtonActionMain";

interface IAppBanner {
  title: string;
  description: string;
  titleBtn: string;
  IconLeftProps?: React.ReactNode;

  onPress: () => void;
  onCloseBanner: () => void;
  variant?: ColorGradientVariant;
}

export const AppBanner = ({
  title,
  description,
  titleBtn,
  IconLeftProps,
  variant = "yellow",
  onPress,
  onCloseBanner,
}: IAppBanner) => {
  const { maskGradient } = colorGradients[variant];
  return (
    <LinearGradient
      colors={maskGradient}
      className="h-[245px] w-10/12 rounded-[25px] "
    >
      <View className="flex h-full w-full flex-col justify-around p-6">
        <View className="flex flex-row justify-between">
          <AppText
            text={title}
            className=" text-font-24 font-weight_400 text-white"
          />
          <TouchableOpacity
            activeOpacity={0.5}
            className="bg-dark flex h-[30px] w-[30px] items-center justify-center rounded-full"
            onPress={onCloseBanner}
          >
            <CrossIcon />
          </TouchableOpacity>
        </View>
        <View className="pt-2">
          <AppText
            text={description}
            className=" text-font-14 font-weight_400 text-white"
          />
        </View>
        <View className="pt-5">
          <ButtonActionMain
            title={titleBtn}
            progress={0}
            IconLeftProps={IconLeftProps}
            styleBoxShadowBtn
            onPress={onPress}
            classButton="py-1"
            classTitleButton="pt-2"
            variant={variant}
          />
        </View>
      </View>
    </LinearGradient>
  );
};
