import React from "react";
import { View } from "react-native";

const Rail = ({ selected }: { selected?: boolean }) => {
  if (selected) return <View className="bg-blue_3 h-1 rounded-sm" />;

  return <View className="bg-blue_3 h-1 flex-1 rounded-sm opacity-20" />;
};

export default Rail;
