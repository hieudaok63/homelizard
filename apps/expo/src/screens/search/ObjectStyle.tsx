import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { type CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

// import { type ObjectStyle } from "@homelizard/schema";
import { cn } from "@homelizard/tailwind-config/utils";

import CheckIcon from "@assets/icons/CheckIcon.svg";
import InfoSCircleIcon from "@assets/icons/InfoSCircleIcon.svg";
import PlusIcon from "@assets/icons/PlusIcon.svg";

import { api, type RouterOutputs } from "~/utils/api";
import { genImageUrl } from "~/utils/imageUrl";
import { StepProgressButton } from "~/components/ui";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../routes";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "ObjectStyle">;

const ObjectStyleCarousalCard = ({
  item,
}: CarouselRenderItemInfo<RouterOutputs["objectStyle"]["all"][number]>) => {
  const { id, title, description, imageUrl } = item;
  const objectStyles = useSearchWizardStore((state) => state?.objectStyles);
  const toggleObjectStyle = useSearchWizardStore(
    (state) => state?.toggleObjectStyle,
  );

  const selected = objectStyles.includes(id);

  // functions
  const handleToggleObjectStyle = () => {
    toggleObjectStyle(id);
  };

  // return
  return (
    <View className="relative items-center justify-center overflow-hidden px-2">
      <View
        className={cn(
          "w-full overflow-hidden rounded-3xl",
          selected && "border-color_green border-4",
        )}
      >
        <Image
          source={genImageUrl(imageUrl)}
          alt={title}
          className="h-full w-full"
        />
      </View>

      <TouchableOpacity
        className="bg-green absolute right-5 top-5 rounded-full p-3"
        onPress={handleToggleObjectStyle}
      >
        {selected ? <CheckIcon /> : <PlusIcon />}
      </TouchableOpacity>

      <TouchableOpacity className="absolute bottom-6 w-64 flex-row items-center justify-between rounded-full bg-white px-6 py-4">
        <View>
          <Text className="font-weight_700 text-font-15 text-black">
            {title}
          </Text>
          <Text
            numberOfLines={1}
            className="font-weight_400 text-font-12 text-placeholder opacity-85 text-ellipsis"
          >
            {description}
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

  const { data: availableObjectStyles } = api.objectStyle.all.useQuery();

  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth * 0.8;

  // main return
  return (
    <SearchLayout>
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

      <View className="mt-12">
        {availableObjectStyles && (
          <Carousel
            style={{
              width: screenWidth,
              justifyContent: "center",
              alignItems: "center",
            }}
            data={availableObjectStyles}
            width={itemWidth}
            height={400}
            renderItem={ObjectStyleCarousalCard}
            loop={false}
            scrollAnimationDuration={1000}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 30,
            }}
          />
        )}
      </View>

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
