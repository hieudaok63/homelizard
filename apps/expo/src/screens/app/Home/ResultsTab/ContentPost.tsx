import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import DotIcon from "@assets/icons/DotIcon.svg";
import MessageIcon from "@assets/icons/MessageIcon.svg";
import SharePostIcon from "@assets/icons/SharePostIcon.svg";

import { UserAvatar } from "~/components/ui";

interface IItemPost {
  title: string;
  timeCreate: string;
  desc: string;
}

export const ContentPost = ({ item }: { item: IItemPost }) => {
  const HeaderPost = () => {
    return (
      <View className="flex flex-row justify-around bg-white pb-5 pt-4">
        <View className="">
          <UserAvatar />
        </View>
        <View className="max-w-[250px]">
          <Text className="font-weight_400 text-black ">
            {item.title}{" "}
            <Text className="font-weight_600 text-black">Ergebnis wurde </Text>
            gefunden!
          </Text>
          <Text className="mt-4">{item.timeCreate}</Text>
        </View>
        <TouchableOpacity>
          <DotIcon />
        </TouchableOpacity>
      </View>
    );
  };

  const DetailContentPost = () => {
    return (
      <View>
        <Image
          style={{ height: 400, width: "100%" }}
          source={{
            uri: "https://fastly.picsum.photos/id/197/200/300.jpg?hmac=p4Xo0YBZC4uaAtKFs7gx7d5446a8gUo7X6bEI9mgkpg",
          }}
        />
      </View>
    );
  };

  const FooterPost = () => {
    return (
      <View className="flex bg-white pb-5 pl-10 pt-4">
        <View className="  justify-around">
          <Text className="font-weight_500 text-grey pb-3 pl-2">
            {item.desc}
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

  return (
    <View className="rounded-bt-[0] overflow-hidden rounded-[20px] rounded-br-[0]">
      <HeaderPost />
      <DetailContentPost />
      <FooterPost />
    </View>
  );
};
