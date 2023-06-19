import React from "react";
import {
  Image,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
} from "react-native";

import CheckIcon from "@assets/icons/CheckIcon.svg";
import PlusIcon from "@assets/icons/PlusIcon.svg";

type ButtonAddFavorite = {
  contentView?: any;
  onPressSelect?: () => void;
  selected?: boolean;
};

export const ButtonAddFavorite = ({
  onPressSelect,
  selected,
}: ButtonAddFavorite) => {
  return (
    <View className="w-20">
      <Image
        source={require<ImageSourcePropType>("../../../assets/objectTypePng/Subtract.png")}
      />
      <TouchableOpacity
        className="absolute bottom-3 right-2"
        onPress={onPressSelect}
      >
        {selected ? <CheckIcon /> : <PlusIcon />}
      </TouchableOpacity>
    </View>
  );
};
