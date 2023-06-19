import React from "react";
import {
  Dimensions,
  Image,
  View,
  type ImageSourcePropType,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { AppText } from "~/components/ui/AppText";

type IItemProps = {
  item: IItem;
};

export type IItem = {
  title: string;
  desc: string;
  imgSrc: ImageSourcePropType;
};

export const carouselItems: Array<IItem> = [
  {
    title: "Bohemian",
    desc: "A popular style among those...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/Bohemian.png"),
  },
  {
    title: "Coastal-hamptons",
    desc: "Coastal style, also referred to ...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/Coastal-hamptons.png"),
  },
  {
    title: "Contemporary",
    desc: "Often used synonymously for ...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/Contemporary.png"),
  },
  {
    title: "French country",
    desc: "It's all about warm, earthy colo...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/FrenchCountry.png"),
  },
  {
    title: "Hollywood glam",
    desc: "A luxurious, over-the-top and...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/HollywoodGlam.png"),
  },
  {
    title: "Industrial",
    desc: "Inspired by a warehouse or u...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/Industrial.png"),
  },
  {
    title: "Mid-century modern",
    desc: "The style gained popularity du...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/MidCenturyModern.png"),
  },
  {
    title: "Minimalistic",
    desc: "Takes the ideas of modern des...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/Minimalistic.png"),
  },
  {
    title: "Modern",
    desc: "Takes the ideas of modern des...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/Modern.png"),
  },
  {
    title: "Rustic",
    desc: "A return to the basics of natur....",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/Rustic.png"),
  },
  {
    title: "Scandinavian",
    desc: "A return to the basics of natur...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/Scandinavian.png"),
  },
  {
    title: "Shabby chic",
    desc: "A vintage-inspired style, that ...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/ShabbyChic.png"),
  },
  {
    title: "Traditional",
    desc: "A combination of comfortable...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/Traditional.png"),
  },
  {
    title: "Transitional",
    desc: "A much-loved style using el...",
    imgSrc: require<ImageSourcePropType>("@assets/objectTypePng/Transitional.png"),
  },
];

export const ConversationSection = () => {
  const width = Dimensions.get("window").width;

  return (
    <View className="px-8">
      <AppText text="Conversations" large className="text-text_yellow" />
      <View className="-mx-8">
        <Carousel
          data={carouselItems}
          width={width}
          height={330}
          renderItem={ConversationItem}
          loop={false}
          scrollAnimationDuration={1000}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.8,
            parallaxScrollingOffset: 100,
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
        />
      </View>
    </View>
  );
};

const ConversationItem = ({ item }: IItemProps) => {
  return (
    <View className="relative items-center justify-center overflow-hidden px-2">
      <View className="w-full overflow-hidden rounded-3xl">
        <Image
          source={item?.imgSrc}
          alt={item?.title}
          className="max-h-80 w-full"
        />
      </View>
    </View>
  );
};
