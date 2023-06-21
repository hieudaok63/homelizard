import React from "react";
import { TouchableOpacity, View } from "react-native";

import EyeIcon from "@assets/icons/EyeIcon.svg";
import SearchIcon from "@assets/icons/SearchIcon.svg";

import { generateBoxShadowStyle } from "~/utils/helpers";
import { UserAvatar } from "~/components/ui";

export const styleBoxShadow = generateBoxShadowStyle({
  xOffset: 0,
  yOffset: 0,
  shadowColorIos: "#000000",
  shadowOpacity: 0.16,
  shadowRadius: 10,
  elevation: 4,
  shadowColorAndroid: "white",
});
export const Avatar = () => {
  return (
    <View className="h-[375px] w-full rounded-br-full">
      <UserAvatar
        style={{ width: "100%", height: "100%" }}
        className="h-[375px] w-[400px] rounded-none rounded-br-[188px]"
      />
      <TouchableOpacity
        className="absolute right-5 top-16 h-[50px] w-[50px] items-center justify-center rounded-full bg-black"
        activeOpacity={0.5}
      >
        <SearchIcon />
      </TouchableOpacity>
      <TouchableOpacity
        className="absolute bottom-4 right-14 h-[50px] w-[50px] items-center justify-center rounded-full bg-white"
        activeOpacity={0.5}
        style={styleBoxShadow}
      >
        <EyeIcon />
      </TouchableOpacity>
    </View>
  );
};
