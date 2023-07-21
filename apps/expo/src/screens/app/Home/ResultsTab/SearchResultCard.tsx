import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { type RouterOutputs } from "@homelizard/api";

import DotIcon from "@assets/icons/DotIcon.svg";
import MessageIcon from "@assets/icons/MessageIcon.svg";
import SharePostIcon from "@assets/icons/SharePostIcon.svg";

export type SearchResultItem =
  RouterOutputs["searchResult"]["bySearchProfileId"]["data"][number];

export const SearchResultCard = ({ item }: { item: SearchResultItem }) => {
  return (
    <View className="mx-3 mb-5 rounded-full rounded-br-none">
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => alert(1)}
        className="rounded-bt-[0] overflow-hidden rounded-[20px] rounded-br-[0]"
      >
        <SearchResultHeader
          title={item.realEstate.title}
          description={item.realEstate.description}
        />
        <SearchResultImage />
        <SearchResultFooter />
      </TouchableOpacity>
    </View>
  );
};

const SearchResultHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <View className="flex flex-row justify-around bg-white px-5 pb-5 pt-4">
      <View className="max-w-[250px]">
        <Text className="font-weight_400 text-black ">
          <Text className="font-weight_600 text-black">{title}</Text>
        </Text>
        <Text className="mt-4">{description}</Text>
      </View>
      <TouchableOpacity className="ml-auto">
        <DotIcon />
      </TouchableOpacity>
    </View>
  );
};
const SearchResultImage = () => {
  return (
    <View>
      <Image
        source={{
          uri: "https://fastly.picsum.photos/id/197/200/300.jpg?hmac=p4Xo0YBZC4uaAtKFs7gx7d5446a8gUo7X6bEI9mgkpg",
        }}
        className="h-[400px] w-full"
        alt=""
      />
    </View>
  );
};

const SearchResultFooter = () => {
  return (
    <View className="flex bg-white pb-5 pl-10 pt-4">
      <View className="  justify-around">
        <Text className="pb-3 pl-2 font-weight_500 text-grey">
          {/* {item.desc} */}
        </Text>
        <View className="flex flex-row">
          <TouchableOpacity className="mr-4">
            <MessageIcon color="black" fill="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SharePostIcon color="black" fill="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
