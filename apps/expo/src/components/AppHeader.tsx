import React from "react";
import { TouchableOpacity, View } from "react-native";

import ArrowLeftIcon from "@assets/icons/ArrowLeftIcon.svg";

import { useAppNavigation } from "./navigation/useAppNavigation";
import { AppText } from "./ui/AppText";

export interface HeaderProps {
  title?: string;
  onPressBack?: () => void;
}

export const AppHeader = ({ title, onPressBack }: HeaderProps) => {
  const navigation = useAppNavigation();

  const goBack = () => {
    if (onPressBack) {
      onPressBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View className="flex w-full flex-row items-center">
      <TouchableOpacity className="mr-5 p-3" onPress={goBack}>
        <ArrowLeftIcon fill="black"/>
      </TouchableOpacity>
      <AppText text={title ?? ""} className="text-2xl" />
    </View>
  );
};
