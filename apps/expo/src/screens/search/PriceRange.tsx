/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import EuroIcon from "@assets/icons/EuroIcon.svg";

import { RangePicker, StepProgressButton } from "~/components/ui";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../RootStackParams";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "PriceRange">;

const maxPriceRange = 1000000;
const minPriceRange = 0;
const minimumAcceptedValuePrice = 50000;

const PriceRange = ({ navigation }: Props) => {
  // zustand
  const maxPrice = useSearchWizardStore((state) => state?.maxPrice);
  const setMaxPrice = useSearchWizardStore((state) => state?.setMaxPrice);

  // functions
  const handleTouchEnd = useCallback((lowValue: number) => {
    setMaxPrice(Math.max(minimumAcceptedValuePrice, lowValue));
  }, []);

  const handlePressNext = useCallback(() => {
    navigation.navigate("Availability");
  }, []);

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
              Kaufpreis
            </Text>
            <Text className="text-black_1 text-font-12 font-weight_300 opacity-60">
              Welchen Kaufpreis soll deine Immobilie maximal haben?
            </Text>
          </View>
        </View>

        <View className="mb-9 px-4">
          <RangePicker
            min={minPriceRange}
            max={maxPriceRange}
            rangeDisabled={true}
            lowProp={maxPrice}
            onSliderTouchEnd={handleTouchEnd}
            showBottomMetric
            bottomMetricProps={{
              stepNum: 10,
              values: [0, 200000, 400000, 600000, 800000, "1.000.000+"],
            }}
          />
        </View>

        <Text className="text-font-12 font-weight_300 px-4 text-right text-black opacity-60">
          {maxPrice === maxPriceRange ? `${maxPrice}+ €` : `${maxPrice} €`}
        </Text>
        <View className=" ml-10  mt-10 flex-row  items-end  ">
          <EuroIcon width={47} height={30} />
          <EuroIcon width={62} height={35} />
          <EuroIcon width={75} height={45} />
          <EuroIcon width={85} height={50} />
          <EuroIcon width={100} height={65} />
        </View>

        {/* <View className="mt-10">{renderPercentageViews()}</View> */}
      </KeyboardAwareScrollView>

      <StepProgressButton
        title="Continue"
        progress={75}
        onPress={handlePressNext}
      />
    </SearchLayout>
  );
};
export default PriceRange;
