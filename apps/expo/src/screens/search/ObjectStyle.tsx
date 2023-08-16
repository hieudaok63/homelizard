import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { type CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { cn } from "@homelizard/tailwind-config/utils";

import CheckIcon from "@assets/icons/CheckIcon.svg";
import InfoSCircleIcon from "@assets/icons/InfoSCircleIcon.svg";
import PlusIcon from "@assets/icons/PlusIcon.svg";

import { api, type RouterOutputs } from "~/utils/api";
import { genImageUrl } from "~/utils/imageUrl";
import { StepProgressButton } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";
import { getCountScreen } from "~/utils";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../RootStackParams";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "ObjectStyle">;
type IObjectStyleItem = RouterOutputs["objectStyle"]["all"][number];

const screenWidth = Dimensions.get("window").width;
const itemWidth = screenWidth * 0.8;

const ObjectStyleCarousalCard = ({
  item,
}: CarouselRenderItemInfo<IObjectStyleItem>) => {
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
          selected && "border-4 border-color_green",
        )}
      >
        <Image
          source={genImageUrl(imageUrl)}
          alt={title}
          className="h-full w-full"
        />
      </View>

      <TouchableOpacity
        className="absolute right-5 top-5 rounded-full bg-green p-3"
        onPress={handleToggleObjectStyle}
      >
        {selected ? <CheckIcon /> : <PlusIcon />}
      </TouchableOpacity>

      <TouchableOpacity className="absolute bottom-6 w-64 flex-row items-center justify-between rounded-full bg-white px-6 py-4">
        <View>
          <Text className="text-font-15 font-weight_700 text-black">
            {title}
          </Text>
          <Text
            numberOfLines={1}
            className="opacity-85 text-ellipsis text-font-12 font-weight_400 text-placeholder"
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
  const objectStyles = useSearchWizardStore((state) => state?.objectStyles);
  // TRPC
  const { data, isLoading } = api.objectStyle.all.useQuery();

  // functions
  const handlePressNext = () => {
    navigation?.navigate("ObjectStyleResult");
  };

  // main return
  return (
    <SearchLayout>
      <View className="mb-4 px-8">
        <Text className="text-font-18 font-weight_800 text-black_1">
          Wir finden für dich
        </Text>

        <View className="mt-5">
          <Text className="mb-1 text-font-14 font-weight_800 text-black_1">
            Welchen Stil soll das Objekt haben?
          </Text>
          <Text className="text-font-12 font-weight_300 text-black_1 opacity-60">
            Wähle aus der Liste
          </Text>
        </View>
      </View>

      <View className="mt-12">
        {data?.length ? (
          <Carousel
            style={{
              width: screenWidth,
              justifyContent: "center",
              alignItems: "center",
            }}
            data={data}
            width={itemWidth}
            height={310}
            renderItem={ObjectStyleCarousalCard}
            loop={false}
            scrollAnimationDuration={1000}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 30,
            }}
          />
        ) : (
          <AppText text="Loading..." className="w-full text-center" />
        )}
      </View>

      <StepProgressButton
        title="Continue"
        progress={getCountScreen("ObjectStyle")}
        onPress={handlePressNext}
        disabled={!objectStyles?.length}
        variant="turquoise"
      />
    </SearchLayout>
  );
};
export default ObjectStyle;
