import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import MessageIcon from "@assets/icons/MessageIcon.svg";
import SharePostIcon from "@assets/icons/SharePostIcon.svg";

interface FooterPost {
  desc: string;
  action?: boolean;
}

export const FooterPost = ({ desc, action }: FooterPost) => {
  return (
    <View className="flex bg-white pb-5 pl-10 pt-4">
      <View className="  justify-around">
        <Text className="font-weight_500 text-grey pb-3 pl-2">{desc}</Text>
        {action && (
          <View className="flex flex-row">
            <TouchableOpacity className="mr-4">
              <MessageIcon color="black" fill="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <SharePostIcon color="black" fill="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
