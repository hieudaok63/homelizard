import React from "react";
import { Text, View } from "react-native";

import { cn } from "@homelizard/tailwind-config/utils";

interface IDetailObject {
  Icon?: React.ReactNode;
  text: string | number;
  className?: string;
}

export const DetailObject = ({ Icon, text }: IDetailObject) => {
  return (
    <View
      className={cn(
        "flex flex-row",
        Icon ? " items-center" : "ml-auto mr-auto mt-2  w-7/12 pb-5",
      )}
    >
      {Icon && Icon}
      <Text
        className={cn(
          " font-weight_800 ml-1",
          Icon ? "text-font-14" : "text-font-18 ",
        )}
      >
        {text}
      </Text>
    </View>
  );
};
