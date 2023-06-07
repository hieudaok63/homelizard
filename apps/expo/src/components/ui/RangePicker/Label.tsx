import React from "react";
import { Text, View } from "react-native";

const Label = ({ text }: { text: number }) => {
  return (
    <View className="bg-blue_3 items-center rounded-md p-1">
      <Text className="text-font-12 font-weight_400 text-white">{text}</Text>
    </View>
  );
};

export default Label;
