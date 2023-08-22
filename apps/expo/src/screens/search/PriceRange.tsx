/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback } from "react";
import { Platform, Text, View, type ImageSourcePropType } from "react-native";
import { useAssets, type Asset } from "expo-asset";
import { Image } from "expo-image";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { RangePicker, StepProgressButton } from "~/components/ui";
import { getCountScreen } from "~/utils";
import { useSearchWizardStore } from "~/zustand/store";
import {
  MAX_PURCHASE_PRICE,
  MAX_RENT_PRICE,
} from "../../../../../packages/api/src/constant/searchProfile.constant";
import { type RootStackParams } from "../RootStackParams";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "PriceRange">;

const minPriceRange = 0;
const minimumAcceptedValuePriceRent = 1;
const minimumAcceptedValuePriceBuy = 1000;
const BLUR_RADIUS = Platform.OS === "ios" ? 4 : 1;
const rangeConfig = {
  rent: {
    maxPrice: MAX_RENT_PRICE,
    rangeLabels: [0, "1k", "2k", "3k", "4k+"],
    textMaxPrice: ">4k",
    level1: 0,
    level2: 1000,
    level3: 2000,
    level4: 3000,
  },
  buy: {
    maxPrice: MAX_PURCHASE_PRICE,
    rangeLabels: [0, "300k", "600k", "900k", "1.2m+"],
    textMaxPrice: ">1.2M",
    level1: 0,
    level2: 300000,
    level3: 600000,
    level4: 900000,
  },
};

const PriceRange = ({ navigation }: Props) => {
  // image
  const [GoldIcons] = useAssets([
    require("@assets/GoldCoinsIcon.png"),
    require("@assets/GoldenBagIcon.png"),
    require("@assets/GoldChestIcon.png"),
    require("@assets/GoldBarrelIcon.png"),
  ]);

  // zustand
  const maxPrice = useSearchWizardStore((state) => state?.maxPrice);
  const setMaxPrice = useSearchWizardStore((state) => state?.setMaxPrice);
  const purchaseType = useSearchWizardStore((state) => state?.purchaseType);

  // functions
  const handleTouchEnd = useCallback((lowValue: number) => {
    setMaxPrice(
      Math.max(
        purchaseType === "buy"
          ? minimumAcceptedValuePriceBuy
          : minimumAcceptedValuePriceRent,
        lowValue,
      ),
    );
  }, []);

  const handlePressNext = useCallback(() => {
    navigation.navigate("Availability");
  }, []);

  const RenderRangePrice = () => {
    return (
      <View className="mb-9 px-4">
        <RangePicker
          min={minPriceRange}
          max={rangeConfig[purchaseType].maxPrice}
          rangeDisabled={true}
          lowProp={maxPrice}
          onSliderTouchEnd={handleTouchEnd}
          showBottomMetric
          renderLabelProps={(value: number | string) => {
            return (
              <View className="items-center rounded-md bg-blue_3 p-1">
                <Text className="text-font-12 font-weight_400 text-white">
                  {value === rangeConfig[purchaseType].maxPrice
                    ? rangeConfig[purchaseType].textMaxPrice
                    : value}
                </Text>
              </View>
            );
          }}
          bottomMetricProps={{
            stepNum: 8,
            values: rangeConfig[purchaseType].rangeLabels,
          }}
        />
      </View>
    );
  };
  if (!GoldIcons) return;
  // main return
  return (
    <SearchLayout>
      <View>
        <View className="mb-4 px-8">
          <Text className="text-font-18 font-weight_800 text-black_1">
            Wir finden für dich
          </Text>
          <View className="mt-5">
            <Text className="mb-1 text-font-14 font-weight_800 text-black_1">
              {purchaseType === "buy" ? "Kaufpreis" : "Mietpreis (kalt)"}
            </Text>
            <Text className="text-font-12 font-weight_300 text-black_1 opacity-60">
              Welchen Kaufpreis soll deine Immobilie maximal haben?
            </Text>
          </View>
        </View>

        <RenderRangePrice />
        <View className="flex flex-row">
          <GoldImage source={GoldIcons[0]!} />
          <GoldImage
            source={GoldIcons[1]!}
            blur={maxPrice < rangeConfig[purchaseType].level2}
          />
          <GoldImage
            source={GoldIcons[2]!}
            blur={maxPrice < rangeConfig[purchaseType].level3}
          />
          <GoldImage
            source={GoldIcons[3]!}
            blur={maxPrice < rangeConfig[purchaseType].level4}
          />
        </View>
      </View>

      <StepProgressButton
        title="Continue"
        progress={getCountScreen("PriceRange")}
        variant="turquoise"
        onPress={handlePressNext}
      />
    </SearchLayout>
  );
};
export default PriceRange;

interface GoldImageProps {
  source: Asset;
  blur?: boolean | undefined;
}

const GoldImage = ({ source, blur }: GoldImageProps) => (
  <Image
    className="h-[232px] basis-1/4"
    contentFit="contain"
    contentPosition="center"
    source={source as ImageSourcePropType}
    blurRadius={blur ? BLUR_RADIUS : 0}
    aria-label={source.name}
  />
);
