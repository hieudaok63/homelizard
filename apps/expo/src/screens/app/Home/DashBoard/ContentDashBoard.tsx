import React from "react";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";

import ArrowRightIcon from "@assets/icons/ArrowRightIcon.svg";

import { generateBoxShadowStyle } from "~/utils/helpers";
import { AppText } from "~/components/ui/AppText";

interface IItem {
  name: string;
  date: string;
  status: string;
  id: number;
}

export const styleBoxShadow = generateBoxShadowStyle({
  xOffset: 0,
  yOffset: 0,
  shadowColorIos: "#000000",
  shadowOpacity: 0.16,
  shadowRadius: 10,
  elevation: 4,
  shadowColorAndroid: "white",
});

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

export const ContentDashBoard = ({ item }: { item: IItem[] }) => {
  const { width } = Dimensions.get("window");
  const _renderItemChild = ({ item }: { item: IItem }) => {
    return (
      <View
        className="mb-3 items-center justify-center"
        style={{
          width: width,
        }}
      >
        <TouchableOpacity
          className="flex w-80 flex-row items-center justify-between rounded-full bg-white px-4 py-3"
          style={[styleBoxShadow]}
        >
          <View>
            <AppText text={item.name} className="font-weight_700" />
            <View className="mt-1 flex flex-row">
              <View
                className={`${itemColorByStatus(
                  item.status,
                )} w-20 rounded-full`}
              >
                <AppText
                  text={item.status}
                  className="font-weight_600 text-center text-white"
                />
              </View>
              <AppText text={item.date} className="text-grey ml-1" />
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
      style={{ paddingTop: 10 }}
    />
  );
};
