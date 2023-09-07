import React from "react";
import {
  Dimensions,
  Image,
  View,
  type ImageSourcePropType,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { t } from "i18next";

import { AppText } from "~/components/ui/AppText";

type IItemProps = {
  item: IItem;
};

export type IItem = {
  title: string;
  description: string;
  imgSrc: ImageSourcePropType;
  listUser: ImageSourcePropType[];
};

export const carouselItems: Array<IItem> = [
  {
    title: "Bohemian",
    description: "A popular style among those...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Bohemian.png"),
    listUser: [
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    ],
  },
  {
    title: "Coastal-hamptons",
    description: "Coastal style, also referred to ...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Coastal-hamptons.png"),
    listUser: [
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    ],
  },
  {
    title: "Contemporary",
    description: "Often used synonymously for ...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    listUser: [
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    ],
  },
  {
    title: "French country",
    description: "It's all about warm, earthy colo...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/FrenchCountry.png"),
    listUser: [
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    ],
  },
  {
    title: "Hollywood glam",
    description: "A luxurious, over-the-top and...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/HollywoodGlam.png"),
    listUser: [
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    ],
  },
  {
    title: "Industrial",
    description: "Inspired by a warehouse or u...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Industrial.png"),
    listUser: [
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    ],
  },
  {
    title: "Mid-century modern",
    description: "The style gained popularity du...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/MidCenturyModern.png"),
    listUser: [
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    ],
  },
  {
    title: "Minimalistic",
    description: "Takes the ideas of modern des...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Minimalistic.png"),
    listUser: [
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    ],
  },
  {
    title: "Modern",
    description: "Takes the ideas of modern des...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Modern.png"),
    listUser: [
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    ],
  },
  {
    title: "Rustic",
    description: "A return to the basics of natur....",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Rustic.png"),
    listUser: [
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    ],
  },
  {
    title: "Scandinavian",
    description: "A return to the basics of natur...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Scandinavian.png"),
    listUser: [
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    ],
  },
  {
    title: "Shabby chic",
    description: "A vintage-inspired style, that ...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/ShabbyChic.png"),
    listUser: [
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    ],
  },
  {
    title: "Traditional",
    description: "A combination of comfortable...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Traditional.png"),
    listUser: [
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    ],
  },
  {
    title: "Transitional",
    description: "A much-loved style using el...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Transitional.png"),
    listUser: [
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
      require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
    ],
  },
];

export const ConversationSection = () => {
  const width = Dimensions.get("window").width;

  return (
    <View className="px-6">
      <AppText
        text={t("home:conversations")}
        large
        className="text-text_yellow"
      />
      <View className="-mx-6">
        <Carousel
          data={carouselItems}
          width={width}
          height={330}
          renderItem={ConversationItem}
          style={{ marginTop: -24 }}
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
      <View className="absolute bottom-0 left-0  right-0 flex-row justify-between bg-white/30 backdrop-brightness-200">
        <View className="flex-1 justify-between px-4 py-3 ">
          <AppText
            text={item?.title}
            classText="text-2xl font-extrabold"
            numberOfLines={1}
          />
          <View className="flex-row">
            {item?.listUser.map((elm) => {
              return (
                <Image
                  className="-mr-4 flex h-14 w-14  rounded-l-full  rounded-tr-full"
                  style={{ borderWidth: 1, borderColor: "white" }}
                  source={elm}
                  aria-label="Profile picture"
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};
