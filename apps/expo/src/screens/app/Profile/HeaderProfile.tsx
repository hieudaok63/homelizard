import React from "react";
import { TouchableOpacity, View } from "react-native";

import DotIcon from "@assets/icons/DotIcon.svg";
import EditIcon from "@assets/icons/EditIcon.svg";

import { generateBoxShadowStyle } from "~/utils/helpers";
import { AppText } from "~/components/ui/AppText";
import { Avatar } from "./Avatar";

export const styleBoxShadow = generateBoxShadowStyle({
  xOffset: 0,
  yOffset: 0,
  shadowColorIos: "#000000",
  shadowOpacity: 0.16,
  shadowRadius: 10,
  elevation: 4,
  shadowColorAndroid: "white",
});
export const HeaderProfile = () => {
  return (
    <>
      <Avatar />
      <View className="flex flex-row items-center justify-between px-6">
        <View className="w-5/6 ">
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
