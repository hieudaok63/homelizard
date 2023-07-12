import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

import { cn } from "@homelizard/tailwind-config/utils";

import ArrowRightIcon from "@assets/icons/ArrowRightIcon.svg";

import { AppText } from "~/components/ui/AppText";

export const DATA_UPLOAD = [
  {
    id: 1,
    name: "Copy Name Image",
    date: "10 Oct 2023",
    type: "Shared",
  },
  {
    id: 2,
    name: "Drive File",
    date: "10 Oct 2023",
    type: "Private",
  },
];

interface IItem {
  id: number;
  name: string;
  date: string;
  type: string;
}

const badgeColorByType = (type: string) => {
  switch (type) {
    case "Shared":
      return "bg-blue";
    case "Private":
      return "bg-text_yellow";

    default:
      return "";
  }
};

export const UploadSection = () => {
  return (
    <View className="mb-4 px-8">
      <View className="flex flex-row items-center justify-between pb-4 pt-3">
        <AppText text="Uploads" large className="text-purple" />
        <TouchableOpacity activeOpacity={0.5}>
          <AppText text="See all" className="text-blue" />
        </TouchableOpacity>
      </View>
      <FlatList data={DATA_UPLOAD} renderItem={UploadItem} />
    </View>
  );
};

const UploadItem = ({ item }: { item: IItem }) => {
  return (
    <View className="flex items-center px-14">
      <TouchableOpacity className="mb-3 mr-1 flex w-80 justify-center rounded-full bg-white ">
        <View className="flex flex-row">
          {/* <UserAvatar radius={20} color="red" /> */}
          <View className="ml-10 w-4/6 p-3">
            <AppText text={item.name} className="font-weight_700" />
            <View className="mt-1 flex  flex-row">
              <View
                className={cn("w-20 rounded-full", badgeColorByType(item.type))}
              >
                <AppText
                  text={item.type}
                  className="font-weight_600 text-center text-white"
                />
              </View>
              <AppText text={item.date} className="text-grey ml-1" />
            </View>
          </View>
          <View className="ml-7 mt-5  ">
            <ArrowRightIcon fill="#000000" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
