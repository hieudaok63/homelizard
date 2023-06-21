import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import DotIcon from "@assets/icons/DotIcon.svg";

import { UserAvatar } from "..";

interface HeaderPostProps {
  title: string;
  name: string;
  timeCreate: string;
}

export const HeaderPost = ({ title, name, timeCreate }: HeaderPostProps) => {
  return (
    <View className="flex flex-row bg-white pb-5 pl-10 pt-4">
      <UserAvatar />
      <View className="pl-5">
        <Text className="font-weight_400 mb-4 text-black ">
          {title} <Text className="font-weight_600 text-black">{name}</Text>
        </Text>
        <Text>{timeCreate}</Text>
      </View>
      <TouchableOpacity className="absolute right-0 top-3">
        <DotIcon />
      </TouchableOpacity>
    </View>
  );
};
