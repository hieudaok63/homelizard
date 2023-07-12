import React from "react";

import { TouchableOpacity } from "react-native";
import { useNavigation, type NavigationProp } from "@react-navigation/native";

import ArrowLeftIcon from "@assets/icons/ArrowLeftIcon.svg";

import { type RootStackParams } from "~/screens/RootStackParams";

type IProps = {
  screen?: keyof RootStackParams;
};

export const BackButton = (props: IProps) => {
  const { screen } = props;
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const onPress = () => {
    if (screen) {
      navigation.navigate(screen);
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <ArrowLeftIcon />
    </TouchableOpacity>
  );
};
