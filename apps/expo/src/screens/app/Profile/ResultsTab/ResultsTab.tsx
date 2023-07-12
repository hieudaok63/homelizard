import React from "react";
import { View, type ImageSourcePropType } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { AppText } from "~/components/ui/AppText";
import { ContentPost } from "./ContentPost";

export type IItem = {
  title: string;
  desc: string;
  imgSrc: ImageSourcePropType;
  timeCreate: string;
  id: number;
};

type ISection = {
  key?: string;
  data: readonly IItem[];
};

export const PostItems: ISection[] = [
  {
    key: "Heute",
    data: [
      {
        title: "Bohemian",
        desc: "A popular style among those...",
        imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Bohemian.png"),
        timeCreate: "8 Hours ago",
        id: 1,
      },
      {
        title: "Coastal-hamptons",
        desc: "Coastal style, also referred to ...",
        imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Coastal-hamptons.png"),
        timeCreate: "8 Hours ago",
        id: 2,
      },
    ],
  },
  {
    key: "Gestern",
    data: [
      {
        title: "Contemporary",
        desc: "Often used synonymously for ...",
        imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
        timeCreate: "8 Hours ago",
        id: 3,
      },
      {
        title: "French country",
        desc: "It's all about warm, earthy colo...",
        imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/FrenchCountry.png"),

        timeCreate: "8 Hours ago",
        id: 4,
      },
      {
        title: "Hollywood glam",
        desc: "A luxurious, over-the-top and...",
        imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/HollywoodGlam.png"),
        timeCreate: "8 Hours ago",
        id: 5,
      },
      {
        title: "Industrial",
        desc: "Inspired by a warehouse or u...",
        imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Industrial.png"),
        timeCreate: "8 Hours ago",
        id: 6,
      },
      {
        title: "Mid-century modern",
        desc: "The style gained popularity du...",
        imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/MidCenturyModern.png"),
        timeCreate: "8 Hours ago",
        id: 7,
      },
    ],
  },
];

export const ResultsTab = () => {
  return (
    <Tabs.SectionList
      sections={PostItems}
      renderItem={ResultItem}
      renderSectionHeader={SectionHeader}
      ListHeaderComponent={
        <View className="px-6 pb-4 pt-6">
          <AppText text="Objekte" large />
        </View>
      }
      ListFooterComponent={BottomNavBarPadding}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
    />
  );
};

const ResultItem = ({ item }: { item: IItem }) => {
  return (
    <View className="mx-3 mb-5 rounded-full rounded-br-none">
      <ContentPost item={item} />
    </View>
  );
};

const SectionHeader = (info: { section: ISection }) => (
  <AppText
    text={info.section.key!}
    className="font-nunito-semibold px-4 pb-2 text-2xl"
  />
);
