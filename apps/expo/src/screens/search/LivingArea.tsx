/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import {
  HouseMultipleRoom,
  RangePicker,
  StepProgressButton,
} from "~/components/ui";
import { getCountScreen } from "~/utils";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../RootStackParams";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "LivingArea">;

const minWidthLiving = 61;
const minHeightLiving = 61;
const maxWidthLiving = 270;
const maxHeightLiving = 370;

const maxValueLiving = 500;
const minValueLiving = 0;
const minimumAcceptedValueLiving = 0;

const LivingArea = ({ navigation }: Props) => {
  const { t } = useTranslation("search");

  // zustand
  const livingArea = useSearchWizardStore((state) => state?.livingArea);
  const setLivingArea = useSearchWizardStore((state) => state?.setLivingArea);
  const numberOfRoom = useSearchWizardStore((state) => state?.numberOfRooms);
  const plotSize = useSearchWizardStore((state) => state?.plotSize);

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
  console.log(
    { numberOfRoom },
    { width: handleSizeLand("width") },
    { height: handleSizeLand("height") },
  );

  // main return
  return (
    <SearchLayout>
      <View>
        <View className="mb-4 px-8">
          <Text className="text-font-18 font-weight_800 text-black_1">
            {t("search.label.weSearch")}
          </Text>

          <View className="mt-5">
            <Text className="mb-1 text-font-14 font-weight_800 text-black_1">
              {t("search.label.livingArea")}
            </Text>
            <Text className="text-font-12 font-weight_300 text-black_1 opacity-60">
              {t("search.text.livingAreaSize")}
            </Text>
          </View>
        </View>

        <View className="mb-9 px-4">
          <RangePicker
            min={minValueLiving}
            max={maxValueLiving}
            rangeDisabled={true}
            lowProp={livingArea}
            // onSliderTouchEnd={handleTouchEnd}
            showBottomMetric
            bottomMetricProps={{
              stepNum: 10,
              values: [0, 100, 200, 300, 400, "500+"],
            }}
            handleValueChange={handleTouchEnd} // avoid this, cause poor performace re-render
          />
        </View>
        <HouseMultipleRoom
          numberOfRoom={numberOfRoom}
          classImage="absolute z-50"
          value={
            livingArea === maxValueLiving
              ? `${livingArea}+ m²`
              : `${livingArea} m²`
          }
          style={{ elevation: 50 }}
          livingArea={livingArea}
          plotSize={plotSize}
        />
      </View>

      <StepProgressButton
        title={t("general.button.continue")}
        progress={getCountScreen("LivingArea")}
        onPress={handlePressNext}
        variant="turquoise"
      />
    </SearchLayout>
  );
};
export default LivingArea;
