import React from "react";
import { Image, View } from "react-native";

interface DetailPost {
  imageLink: string;
}

export const DetailContentPost = ({ imageLink }: DetailPost) => {
  return (
    <View className="">
      <Image
        source={{
          uri: imageLink,
        }}
        className="h-[400px] w-full"
      />
    </View>
  );
};
