import React from "react";
import { Image, View } from "react-native";

export const UserAvatar = () => {
  return (
    <View
      className={`bg-grey_2 flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-l-full rounded-tr-full`}
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
