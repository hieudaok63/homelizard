import React from "react";
import {
  FlatList,
  View,
  type ImageSourcePropType,
  type LayoutChangeEvent,
} from "react-native";

import PostComponent from "~/components/PostComponent";
import { BottomNavBarPadding } from "~/components/navigation/TabBar";
import { AppText } from "~/components/ui/AppText";

export type IItem = {
  title: string;
  desc: string;
  imgSrc: ImageSourcePropType;
  timeCreate: string;
};

export type Props = {
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
};

export const PostItems: Array<IItem> = [
  {
    title: "Bohemian",
    desc: "A popular style among those...",
    imgSrc: require("@assets/objectTypePng/Bohemian.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Coastal-hamptons",
    desc: "Coastal style, also referred to ...",
    imgSrc: require("@assets/objectTypePng/Coastal-hamptons.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Contemporary",
    desc: "Often used synonymously for ...",
    imgSrc: require("@assets/objectTypePng/Contemporary.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "French country",
    desc: "It's all about warm, earthy colo...",
    imgSrc: require("@assets/objectTypePng/FrenchCountry.png"),

    timeCreate: "8 Hours ago",
  },
  {
    title: "Hollywood glam",
    desc: "A luxurious, over-the-top and...",
    imgSrc: require("@assets/objectTypePng/HollywoodGlam.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Industrial",
    desc: "Inspired by a warehouse or u...",
    imgSrc: require("@assets/objectTypePng/Industrial.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Mid-century modern",
    desc: "The style gained popularity du...",
    imgSrc: require("@assets/objectTypePng/MidCenturyModern.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Minimalistic",
    desc: "Takes the ideas of modern des...",
    imgSrc: require("@assets/objectTypePng/Minimalistic.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Modern",
    desc: "Takes the ideas of modern des...",
    imgSrc: require("@assets/objectTypePng/Modern.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Rustic",
    desc: "A return to the basics of natur....",
    imgSrc: require("@assets/objectTypePng/Rustic.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Scandinavian",
    desc: "A return to the basics of natur...",
    imgSrc: require("@assets/objectTypePng/Scandinavian.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Shabby chic",
    desc: "A vintage-inspired style, that ...",
    imgSrc: require("@assets/objectTypePng/ShabbyChic.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Traditional",
    desc: "A combination of comfortable...",
    imgSrc: require("@assets/objectTypePng/Traditional.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Transitional",
    desc: "A much-loved style using el...",
    imgSrc: require("@assets/objectTypePng/Transitional.png"),
    timeCreate: "8 Hours ago",
  },
];

const _renderItem = ({ item }: { item: IItem }) => {
  return (
    <PostComponent
      action={false}
      title={item.title}
      desc={item.desc}
      name="Transitional "
      imageLink="https://picsum.photos/200/300"
      timeCreate={item.timeCreate}
      className="my-2 overflow-hidden rounded-[20px]"
    />
  );
};
const ListHeaderPost = () => {
  return (
    <View className="pt-5">
      <AppText
        text="Objekte"
        className="text-font-32 font-weight_300 pb-2 pl-8  text-black"
      />
      <AppText
        text="Heute"
        className="text-font-24 font-weight_500 pb-2 pl-4 pt-5 text-black"
      />
    </View>
  );
};

export const ContentPost = () => {
  return (
    <View className="h-full px-3">
      <FlatList
        data={PostItems}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        ListFooterComponent={BottomNavBarPadding}
        ListHeaderComponent={ListHeaderPost}
      />
    </View>
  );
};
