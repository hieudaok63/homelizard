import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

import ArrowRightIcon from "@assets/icons/ArrowRightIcon.svg";

import { generateBoxShadowStyle } from "~/utils/helpers";
import { AppText } from "~/components/ui/AppText";

interface IItem {
  name: string;
  date: string;
  status: string;
  id: number;
}

export const styleBoxShadow = generateBoxShadowStyle("shadowBtn");

const itemColorByStatus = (status: string) => {
  switch (status) {
    case "Family":
      return "bg-pink_2";
    case "Business":
      return "bg-blue_5";
    case "Friends":
      return "bg-green_2";
    default:
      return "";
  }
};

export const ContentDashBoard = ({
  item,
  index,
}: {
  item: IItem[];
  index: number;
}) => {
  const { width } = Dimensions.get("window");
  const ContemporaryImage = require("@assets/objectStyleImage/Contemporary.png");
  const _renderItemChild = ({ item }: { item: IItem }) => {
    return (
      <View className={`mb-3 px-6`}>
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-between rounded-full bg-white px-4 py-3"
          style={[styleBoxShadow]}
        >
          <View className="flex-1 flex-row items-center">
            <Image
              className="flex h-14 w-14 overflow-hidden rounded-l-full rounded-tr-full bg-grey_2"
              source={ContemporaryImage}
              aria-label="Profile picture"
            />
            <View className="mx-4 flex-1  justify-between">
              <AppText text={item.name} className="font-nunito-bold" />
              <View className="mt-1 flex flex-row items-center">
                <View
                  className={`${itemColorByStatus(
                    item.status,
                  )} h-6 w-20 items-center justify-center rounded-full`}
                >
                  <AppText
                    text={item.status}
                    className="font-nunito-semibold text-center text-white"
                  />
                </View>
                <AppText
                  text={item.date}
                  className="ml-2 flex-1 text-zinc-500"
                />
              </View>
            </View>
          </View>
          <ArrowRightIcon fill="#000000" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={item}
      renderItem={_renderItemChild}
      scrollEnabled={false}
      style={{ width: width }}
    />
  );
};
