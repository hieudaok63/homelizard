import React from "react";
import { View, type ImageSourcePropType } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { HeaderContent, LayoutContent } from "~/components/ui/Profile";
import { ContentPost } from "./ContentPost";

export type IItem = {
  title: string;
  desc: string;
  imgSrc: ImageSourcePropType;
  timeCreate: string;
};

export const PostItems: Array<IItem> = [
  {
    title: "Bohemian",
    desc: "A popular style among those...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Bohemian.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Coastal-hamptons",
    desc: "Coastal style, also referred to ...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Coastal-hamptons.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Contemporary",
    desc: "Often used synonymously for ...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "French country",
    desc: "It's all about warm, earthy colo...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/FrenchCountry.png"),

    timeCreate: "8 Hours ago",
  },
  {
    title: "Hollywood glam",
    desc: "A luxurious, over-the-top and...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/HollywoodGlam.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Industrial",
    desc: "Inspired by a warehouse or u...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Industrial.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Mid-century modern",
    desc: "The style gained popularity du...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/MidCenturyModern.png"),
    timeCreate: "8 Hours ago",
  },
];

export const ResultsTab = () => {
  return (
    <LayoutContent>
      <Tabs.FlatList
        className="pt-8"
        data={PostItems}
        renderItem={ResultItem}
        ListHeaderComponent={
          <HeaderContent
            resultScreenText="Heute"
            resultScreen
            title="Objekte"
          />
        }
        ListFooterComponent={BottomNavBarPadding}
        showsVerticalScrollIndicator={false}
      />
    </LayoutContent>
  );
};

const ResultItem = ({ item }: { item: IItem }) => {
  return (
    <View className="mx-3 mb-5 rounded-full rounded-br-none">
      <ContentPost item={item} />
    </View>
  );
};
