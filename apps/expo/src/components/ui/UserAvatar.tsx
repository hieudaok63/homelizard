import React from "react";
import { Image, View, type StyleProp, type ViewStyle } from "react-native";

import { cn } from "@homelizard/tailwind-config/utils";

interface userAvatar {
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export const UserAvatar = ({ className, style }: userAvatar) => {
  return (
    <View
      className={cn(
        "bg-grey_2 flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-l-full rounded-tr-full",
        className,
      )}
      style={style}
    >
      <Image
        style={{ width: "100%", height: "100%" }}
        source={{
          uri: "https://picsum.photos/200/300",
        }}
      />
    </View>
  );
};
