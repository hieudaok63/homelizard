import React from "react";
import { TouchableOpacity, View } from "react-native";

import CheckIcon from "@assets/icons/CheckIcon.svg";
import PlusIcon from "@assets/icons/PlusIcon.svg";

type ButtonAddFavorite = {
  onPressSelect?: () => void;
  selected?: boolean;
};

export const ButtonAddFavorite = ({
  onPressSelect,
  selected,
}: ButtonAddFavorite) => {
  return (
    <View className="w-20">
      <TriangleCorner />
      <TouchableOpacity
        className="absolute bottom-4 right-4"
        onPress={onPressSelect}
      >
        {selected ? <CheckIcon /> : <PlusIcon />}
      </TouchableOpacity>
    </View>
  );
};
const TriangleCorner = () => {
  return (
    <View className="border-b-[100px] border-l-[100px] border-b-blue_1 border-l-transparent" />
  );
};
