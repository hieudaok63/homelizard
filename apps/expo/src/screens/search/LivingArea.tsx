/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import HouseIcon from "@assets/icons/HouseIcon.svg";
import HouseMultipleRoomIcon from "@assets/icons/HouseMultipleRoomIcon.svg";
import LandIcon from "@assets/icons/LandIcon.svg";

import { RangePicker, StepProgressButton } from "~/components/ui";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../RootStackParams";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "LivingArea">;

const minWidthLiving = 61;
const minHeightLiving = 61;
const maxWidthLiving = 300;
const maxHeightLiving = 300;

const maxValueLiving = 500;
const minValueLiving = 0;
const minimumAcceptedValueLiving = 50;

const LivingArea = ({ navigation }: Props) => {
  // zustand
  const livingArea = useSearchWizardStore((state) => state?.livingArea);
  const setLivingArea = useSearchWizardStore((state) => state?.setLivingArea);
  const numberOfRoom = useSearchWizardStore((state) => state?.numberOfRooms);

  // functions
  const handleTouchEnd = useCallback((lowValue: number) => {
    setLivingArea(Math.max(lowValue, minimumAcceptedValueLiving));
  }, []);

  const handleSizeLand = useCallback(
    (params: "width" | "height") => {
      if (params === "width") {
        const width = maxWidthLiving * (livingArea / maxValueLiving);
        if (width < minWidthLiving) return minWidthLiving;
        return width;
      }

      if (params === "height") {
        const height = maxHeightLiving * (livingArea / maxValueLiving);
        if (height < minHeightLiving) return minHeightLiving;
        return height;
      }
    },
    [livingArea],
  );

  const handlePressNext = useCallback(() => {
    navigation.navigate("NumberOfRooms");
  }, []);

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
              Wohnfläche
            </Text>
            <Text className="text-font-12 font-weight_300 text-black_1 opacity-60">
              Wieviel qm Wohnfläche benötigst du?
            </Text>
          </View>
        </View>

        <View className="mb-9 px-4">
          <RangePicker
            min={minValueLiving}
            max={maxValueLiving}
            rangeDisabled={true}
            lowProp={livingArea}
            onSliderTouchEnd={handleTouchEnd}
            showBottomMetric
            bottomMetricProps={{
              stepNum: 10,
              values: [0, 100, 200, 300, 400, "500+"],
            }}
            // handleValueChange={handleValueChange} // avoid this, cause poor performace re-render
          />
        </View>

        <Text className="px-4 text-right text-font-12 font-weight_300 text-black opacity-60">
          {livingArea === maxValueLiving
            ? `${livingArea}+ m²`
            : `${livingArea} m²`}
        </Text>

        <View
          className="relative mb-36 items-center justify-center"
          style={{ height: maxHeightLiving }}
        >
          {numberOfRoom <= 5 ? (
            <HouseIcon
              className="absolute z-50"
              style={{ elevation: 50 }}
              width={handleSizeLand("width")}
              height={handleSizeLand("height")}
            />
          ) : (
            <HouseMultipleRoomIcon
              className="absolute z-50"
              style={{ elevation: 50 }}
              width={handleSizeLand("width")}
              height={handleSizeLand("height")}
            />
          )}
          <LandIcon />
        </View>
      </View>

      <StepProgressButton
        title="Continue"
        progress={50}
        onPress={handlePressNext}
        variant="turquoise"
      />
    </SearchLayout>
  );
};
export default LivingArea;
