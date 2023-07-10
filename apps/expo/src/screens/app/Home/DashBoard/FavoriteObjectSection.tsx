import React from "react";
import {
  Dimensions,
  Image,
  View,
  type ImageSourcePropType,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { cn } from "@homelizard/tailwind-config/utils";

import { ButtonAddFavorite } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";
import { useSearchWizardStore } from "~/zustand/store";

type IItemProps = {
  item: IItem;
};

type IItem = {
  title: string;
  desc: string;
  imgSrc: ImageSourcePropType;
};

const carouselItems: Array<IItem> = [
  {
    title: "Bohemian",
    desc: "A popular style among those...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Bohemian.png"),
  },
  {
    title: "Coastal-hamptons",
    desc: "Coastal style, also referred to ...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Coastal-hamptons.png"),
  },
  {
    title: "Contemporary",
    desc: "Often used synonymously for ...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Contemporary.png"),
  },
  {
    title: "French country",
    desc: "It's all about warm, earthy colo...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/FrenchCountry.png"),
  },
  {
    title: "Hollywood glam",
    desc: "A luxurious, over-the-top and...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/HollywoodGlam.png"),
  },
  {
    title: "Industrial",
    desc: "Inspired by a warehouse or u...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Industrial.png"),
  },
  {
    title: "Mid-century modern",
    desc: "The style gained popularity du...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/MidCenturyModern.png"),
  },
  {
    title: "Minimalistic",
    desc: "Takes the ideas of modern des...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Minimalistic.png"),
  },
  {
    title: "Modern",
    desc: "Takes the ideas of modern des...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Modern.png"),
  },
  {
    title: "Rustic",
    desc: "A return to the basics of natur....",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Rustic.png"),
  },
  {
    title: "Scandinavian",
    desc: "A return to the basics of natur...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Scandinavian.png"),
  },
  {
    title: "Shabby chic",
    desc: "A vintage-inspired style, that ...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/ShabbyChic.png"),
  },
  {
    title: "Traditional",
    desc: "A combination of comfortable...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Traditional.png"),
  },
  {
    title: "Transitional",
    desc: "A much-loved style using el...",
    imgSrc: require<ImageSourcePropType>("@assets/objectStyleImage/Transitional.png"),
  },
];

export const FavoriteObjectSection = () => {
  const width = Dimensions.get("window").width;

  return (
    <View className="px-8">
      <AppText text="Favorite objects" large className="text-placeholder" />
      <View className="-mx-8">
        <Carousel
          data={carouselItems}
          width={width}
          height={330}
          renderItem={FavoriteObjectItem}
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

const FavoriteObjectItem = (props: IItemProps) => {
  const { item } = props;

  // zustand
  const objectStyles_zutand = useSearchWizardStore(
    (state) => state?.objectStyles,
  );

  const setObjectStyles_zutand = useSearchWizardStore(
    (state) => state?.setObjectStyles,
  );

  const selected = objectStyles_zutand?.includes(item?.title);

  //functions
  const onPressSelect = () => {
    // setSelected(!selected);
    try {
      let cloned = [...objectStyles_zutand];

      // remove
      if (cloned?.includes(item?.title)) {
        cloned = cloned?.filter((el) => el !== item?.title);
        setObjectStyles_zutand(cloned);
        return;
      }

      // add
      cloned.push(item?.title);
      setObjectStyles_zutand(cloned);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      className={cn(
        "w-full overflow-hidden rounded-3xl",
        selected && "border-2 border-black",
      )}
    >
      <Image source={item?.imgSrc} alt={item?.title} className="w-full" />
      <View className="absolute bottom-0 right-0">
        <ButtonAddFavorite selected={selected} onPressSelect={onPressSelect} />
      </View>
    </View>
  );
};
