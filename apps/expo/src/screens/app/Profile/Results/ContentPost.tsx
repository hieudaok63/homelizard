import React from "react";
import { View } from "react-native";

import {
  DetailContentPost,
  FooterPost,
  HeaderPost,
} from "~/components/ui/Post";

interface IItemPost {
  title: string;
  timeCreate: string;
  desc: string;
}

export const ContentPost = ({ item }: { item: IItemPost }) => {
  return (
    <View className="rounded-bt-[0] overflow-hidden rounded-[20px] rounded-br-[0]">
      <HeaderPost title={item.title} name="Test Name" timeCreate="8 Hour ago" />
      <DetailContentPost imageLink="https://fastly.picsum.photos/id/197/200/300.jpg?hmac=p4Xo0YBZC4uaAtKFs7gx7d5446a8gUo7X6bEI9mgkpg" />
      <FooterPost desc={item.desc} />
    </View>
  );
};
