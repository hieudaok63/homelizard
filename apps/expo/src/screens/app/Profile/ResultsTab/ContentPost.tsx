import React from "react";
import { TouchableOpacity } from "react-native";

import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import {
  DetailContentPost,
  FooterPost,
  HeaderPost,
} from "~/components/ui/Post";

interface IItemPost {
  title: string;
  timeCreate: string;
  desc: string;
  id: string;
}

export const ContentPost = ({ item }: { item: IItemPost }) => {
  const navigation = useAppNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="rounded-bt-[0] overflow-hidden rounded-[20px] rounded-br-[0]"
      onPress={() =>
        navigation.push("ObjectDetail", {
          itemId: item.id,
        })
      }
    >
      <HeaderPost title={item.title} name="Test Name" timeCreate="8 Hour ago" />
      <DetailContentPost imageLink="https://fastly.picsum.photos/id/197/200/300.jpg?hmac=p4Xo0YBZC4uaAtKFs7gx7d5446a8gUo7X6bEI9mgkpg" />
      <FooterPost desc={item.desc} action />
    </TouchableOpacity>
  );
};
