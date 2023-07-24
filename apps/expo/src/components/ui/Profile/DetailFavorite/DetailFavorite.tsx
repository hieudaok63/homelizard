import React from "react";
import { Text, View } from "react-native";

import { cn } from "@homelizard/tailwind-config/utils";

interface IDetailFavorite {
  Icon?: React.ReactNode;
  text: string | number;
  className?: string;
}

export const DetailFavorite = ({ Icon, text }: IDetailFavorite) => {
  return (
    <View
      className={cn(
        "flex flex-row",
        Icon ? "items-center" : "ml-auto mr-auto mt-2 w-7/12 pb-5",
      )}
    >
      {Icon}
      <Text
        className={cn(
          "ml-1 font-nunito-800",
          Icon ? "text-sm" : "text-lg",
        )}
      >
        {text}
      </Text>
    </View>
  );
};
