import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import MessageIcon from "@assets/icons/MessageIcon.svg";

import { NotificationBadge } from "~/components/ui";

export const HeaderHome = () => {
  return (
    <View className="mb-2 mt-2 flex flex-row items-center justify-between px-8">
      <Text className="font-weight_400 text-font-28">Home</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        className="bg-dark flex h-12 w-12 items-center justify-center rounded-full"
      >
        <MessageIcon width={24} height={24} />
        <NotificationBadge number={5} />
      </TouchableOpacity>
    </View>
  );
};
