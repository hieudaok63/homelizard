import React from "react";
import { TouchableOpacity, View } from "react-native";

import DotIcon from "@assets/icons/DotIcon.svg";
import EditIcon from "@assets/icons/EditIcon.svg";
import EyeIcon from "@assets/icons/EyeIcon.svg";
import SearchIcon from "@assets/icons/SearchIcon.svg";

import { generateBoxShadowStyle } from "~/utils/helpers";
import { UserAvatar } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";

export const styleBoxShadow = generateBoxShadowStyle({
  xOffset: 0,
  yOffset: 0,
  shadowColorIos: "#000000",
  shadowOpacity: 0.16,
  shadowRadius: 10,
  elevation: 4,
  shadowColorAndroid: "white",
});
export const HeaderProfileUI = () => {
  return (
    <>
      <View className="h-[375px] w-full rounded-br-full">
        <UserAvatar className="h-full w-full rounded-none rounded-br-[188px]" />
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
      <View className="flex flex-row items-center justify-between px-6">
        <View className="w-5/6">
          <AppText text="Hello, Veronica" className="mt-[17px]" large />
          <View className="mt-[0px] flex flex-row items-center ">
            <AppText
              text="Teile uns etwas über dich mit über dich mit über dich mit..."
              className=" w-3/6"
              numberOfLines={1}
            />
            <TouchableOpacity className="p-5" style={styleBoxShadow}>
              <EditIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View className="-mt-10">
          <TouchableOpacity
            className="h-[50px] w-[50px] items-center justify-center rounded-full bg-white"
            style={styleBoxShadow}
          >
            <DotIcon />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
