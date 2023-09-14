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

type Props = NativeStackScreenProps<RootStackParams, "PlotSize">;

const maxValueLand = 1000;
const minValueLand = 0;
const minimumAcceptedValueLand = 0;

const PlotSize = ({ navigation }: Props) => {
  const { t } = useTranslation("search");

  // zustand
  const plotSize = useSearchWizardStore((state) => state?.plotSize);
  const setPlotSize = useSearchWizardStore((state) => state?.setPlotSize);
  const numberOfRoom = useSearchWizardStore((state) => state?.numberOfRooms);
  const livingArea = useSearchWizardStore((state) => state?.livingArea);

  // functions
  const handleTouchEnd = useCallback((lowValue: number) => {
    setPlotSize(Math.max(minimumAcceptedValueLand, lowValue));
  }, []);

  const handlePressNext = useCallback(() => {
    navigation.navigate("LivingArea");
  }, []);

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
              {t("search.label.landArea")}
            </Text>
            <Text className="text-font-12 font-weight_300 text-black_1 opacity-60">
              {t("search.text.landAreaSize")}
            </Text>
          </View>
        </View>

        <View className="mb-9 px-4">
          <RangePicker
            min={minValueLand}
            max={maxValueLand}
            rangeDisabled={true}
            lowProp={plotSize}
            // onSliderTouchEnd={handleTouchEnd}
            showBottomMetric
            bottomMetricProps={{
              stepNum: 10,
              values: [0, 200, 400, 600, 800, "1000+"],
            }}
            handleValueChange={handleTouchEnd} // avoid this, cause poor performace re-render
          />
        </View>

        <HouseMultipleRoom
          numberOfRoom={numberOfRoom}
          value={
            plotSize === maxValueLand ? `${plotSize}+ m²` : `${plotSize} m²`
          }
          style={{ elevation: 50 }}
          livingArea={livingArea}
          plotSize={plotSize}
        />
      </View>

      <StepProgressButton
        title={t("general.button.continue")}
        progress={getCountScreen("PlotSize")}
        onPress={handlePressNext}
        variant="turquoise"
      />
    </SearchLayout>
  );
};
export default PlotSize;
