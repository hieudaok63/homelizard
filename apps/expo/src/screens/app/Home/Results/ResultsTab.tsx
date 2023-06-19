import React from "react";
import { FlatList, type ImageSourcePropType } from "react-native";

import { BottomNavBarPadding } from "~/components/navigation/TabBar";
import { Container } from "./Container";
import { ContentPost } from "./ContentPost";
import { HeaderPost } from "./HeaderPost";
import { LayoutResults } from "./_layout";

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
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/Bohemian.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Coastal-hamptons",
    desc: "Coastal style, also referred to ...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/Coastal-hamptons.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Contemporary",
    desc: "Often used synonymously for ...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/Contemporary.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "French country",
    desc: "It's all about warm, earthy colo...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/FrenchCountry.png"),

    timeCreate: "8 Hours ago",
  },
  {
    title: "Hollywood glam",
    desc: "A luxurious, over-the-top and...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/HollywoodGlam.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Industrial",
    desc: "Inspired by a warehouse or u...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/Industrial.png"),
    timeCreate: "8 Hours ago",
  },
  {
    title: "Mid-century modern",
    desc: "The style gained popularity du...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/MidCenturyModern.png"),
    timeCreate: "8 Hours ago",
  },
];

export const ResultsTab = () => {
  return (
    <LayoutResults>
      <FlatList
        className="pt-8"
        data={PostItems}
        renderItem={ResultItem}
        ListHeaderComponent={HeaderPost}
        ListFooterComponent={BottomNavBarPadding}
        showsVerticalScrollIndicator={false}
      />
    </LayoutResults>
  );
};

const ResultItem = ({ item }: { item: IItem }) => {
  return (
    <Container>
      <ContentPost item={item} />
    </Container>
  );
};
