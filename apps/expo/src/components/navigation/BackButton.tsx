/* eslint-disable @typescript-eslint/no-unsafe-call */

import React from "react";
import { TouchableOpacity } from "react-native";
import ArrowLeftIcon from "@assets/icons/ArrowLeftIcon.svg";

import { type RootStackParams } from "~/screens/routes";
import { useAppNavigation } from "./useAppNavigation";

type IProps = {
  screen: keyof RootStackParams;
};

export const BackButton = (props: IProps) => {
  const { screen } = props;
  const navigation = useAppNavigation();
  //   const navigation = useNavigation();

  const onPress = () => {
    navigation?.navigate(screen);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <ArrowLeftIcon />
    </TouchableOpacity>
  );
};
