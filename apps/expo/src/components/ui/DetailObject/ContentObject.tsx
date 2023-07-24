import React from "react";
import { View } from "react-native";

import { AppText } from "../AppText";

interface IContentObject {
  type: string;
  content?: string;
}

export const ContentObject = ({ type, content = "" }: IContentObject) => {
  return (
    <View className="flex w-full flex-col">
      <AppText text={type} className="font-nunito-light text-grey" />
      <AppText text={content} className="font-nunito-light text-grey" />
    </View>
  );
};
