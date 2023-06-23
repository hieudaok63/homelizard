/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Carousel from "react-native-reanimated-carousel";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import CheckIcon from "@assets/icons/CheckIcon.svg";
import InfoSCircleIcon from "@assets/icons/InfoSCircleIcon.svg";
import PlusIcon from "@assets/icons/PlusIcon.svg";

import { StepProgressButton } from "~/components/ui";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../routes";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "ObjectStyle">;

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
    imgSrc: require("@assets/objectTypePng/Bohemian.png"),
  },
  {
    title: "Coastal-hamptons",
    desc: "Coastal style, also referred to ...",
    imgSrc: require("@assets/objectTypePng/Coastal-hamptons.png"),
  },
  {
    title: "Contemporary",
    desc: "Often used synonymously for ...",
    imgSrc: require("@assets/objectTypePng/Contemporary.png"),
  },
  {
    title: "French country",
    desc: "It's all about warm, earthy colo...",
    imgSrc: require("@assets/objectTypePng/FrenchCountry.png"),
  },
  {
    title: "Hollywood glam",
    desc: "A luxurious, over-the-top and...",
    imgSrc: require("@assets/objectTypePng/HollywoodGlam.png"),
  },
  {
    title: "Industrial",
    desc: "Inspired by a warehouse or u...",
    imgSrc: require("@assets/objectTypePng/Industrial.png"),
  },
  {
    title: "Mid-century modern",
    desc: "The style gained popularity du...",
    imgSrc: require("@assets/objectTypePng/MidCenturyModern.png"),
  },
  {
    title: "Minimalistic",
    desc: "Takes the ideas of modern des...",
    imgSrc: require("@assets/objectTypePng/Minimalistic.png"),
  },
  {
    title: "Modern",
    desc: "Takes the ideas of modern des...",
    imgSrc: require("@assets/objectTypePng/Modern.png"),
  },
  {
    title: "Rustic",
    desc: "A return to the basics of natur....",
    imgSrc: require("@assets/objectTypePng/Rustic.png"),
  },
  {
    title: "Scandinavian",
    desc: "A return to the basics of natur...",
    imgSrc: require("@assets/objectTypePng/Scandinavian.png"),
  },
  {
    title: "Shabby chic",
    desc: "A vintage-inspired style, that ...",
    imgSrc: require("@assets/objectTypePng/ShabbyChic.png"),
  },
  {
    title: "Traditional",
    desc: "A combination of comfortable...",
    imgSrc: require("@assets/objectTypePng/Traditional.png"),
  },
  {
    title: "Transitional",
    desc: "A much-loved style using el...",
    imgSrc: require("@assets/objectTypePng/Transitional.png"),
  },
];

const Item = (props: IItemProps) => {
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

  // return
  return (
    <View className="relative items-center justify-center overflow-hidden px-2">
      <View
        className={`w-full overflow-hidden rounded-3xl ${
          !!selected ? "border-color_green border-4" : ""
        }`}
      >
        <Image
          source={item?.imgSrc}
          alt={item?.title}
          className="max-h-80 w-full"
        />
      </View>

      <TouchableOpacity
        className="bg-green absolute right-5 top-5 rounded-full p-3"
        onPress={onPressSelect}
      >
        {selected ? <CheckIcon /> : <PlusIcon />}
      </TouchableOpacity>

      <TouchableOpacity className="absolute bottom-6 w-64 flex-row items-center justify-between rounded-full bg-white px-6 py-4">
        <View>
          <Text className="font-weight_700 text-font-15 text-black">
            {item?.title}
          </Text>
          <Text className="font-weight_400 text-font-12 text-placeholder opacity-85">
            {item?.desc}
          </Text>
        </View>
        <InfoSCircleIcon />
      </TouchableOpacity>
    </View>
  );
};

const ObjectStyle = ({ navigation }: Props) => {
  // zustand
  const objectStyles_zutand = useSearchWizardStore(
    (state) => state?.objectStyles,
  );

  // functions
  const handlePressNext = () => {
    navigation?.navigate("ObjectStyleResult");
  };

  const _renderItem = ({ item }: { item: IItem }) => {
    return <Item item={item} />;
  };

  // main return
  return (
    <SearchLayout>
      <KeyboardAwareScrollView>
        <View className="mb-4 px-8">
          <Text className="font-weight_800 text-font-18 text-black_1">
            Wir finden für dich
          </Text>

          <View className="mt-5">
            <Text className="text-black_1 text-font-14 font-weight_800 mb-1">
              Welchen Stil soll das Objekt haben?
            </Text>
            <Text className="text-black_1 text-font-12 font-weight_300 opacity-60">
              Wähle aus der Liste
            </Text>
          </View>
        </View>

        <View className="mb-32 mt-12 flex-1 flex-row justify-center">
          <Carousel
            data={carouselItems}
            width={300}
            height={335}
            renderItem={_renderItem}
            loop={false}
            scrollAnimationDuration={1000}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
          />
        </View>
      </KeyboardAwareScrollView>

      <StepProgressButton
        title="Continue"
        progress={85}
        onPress={handlePressNext}
        disabled={!objectStyles_zutand?.length}
      />
    </SearchLayout>
  );
};
export default ObjectStyle;
