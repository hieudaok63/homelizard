/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HouseIcon from "@assets/icons/HouseIcon.svg";
import HouseMultipleRoomIcon from "@assets/icons/HouseMultipleRoomIcon.svg";
import LandIcon from "@assets/icons/LandIcon.svg";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button, RangePicker, StepProgress } from "~/components/ui";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../routes";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "PlotSize">;

const minWidthLand = 100;
const minHeightLand = 100;
const maxWidthLand = 300;
const maxHeightLand = 300;

const maxValueLand = 1000;
const minValueLand = 0;
const minimumAcceptedValueLand = 100;

const PlotSize = ({ navigation }: Props) => {
  // zustand
  const plotSize = useSearchWizardStore((state) => state?.plotSize);
  const setPlotSize = useSearchWizardStore((state) => state?.setPlotSize);
  const numberOfRoom = useSearchWizardStore((state) => state?.numberOfRooms);

  // functions
  const handleTouchEnd = useCallback((lowValue: number) => {
    setPlotSize(Math.max(minimumAcceptedValueLand, lowValue));
  }, []);

  const handleSizeLand = useCallback(
    (params: "width" | "height") => {
      if (params === "width") {
        const width = maxWidthLand * (plotSize / maxValueLand);
        if (width < minWidthLand) return minWidthLand;
        return width;
      }

      if (params === "height") {
        const height = maxHeightLand * (plotSize / maxValueLand);
        if (height < minHeightLand) return minHeightLand;
        return height;
      }
    },
    [plotSize],
  );

  const handlePressNext = useCallback(() => {
    navigation.navigate("LivingArea");
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
              Grundstücksfläche
            </Text>
            <Text className="text-black_1 text-font-12 font-weight_300 opacity-60">
              Wieviel qm Grundstücksfläche benötigst du?
            </Text>
          </View>
        </View>

        <View className="mb-9 px-4">
          <RangePicker
            min={minValueLand}
            max={maxValueLand}
            rangeDisabled={true}
            lowProp={plotSize}
            onSliderTouchEnd={handleTouchEnd}
            showBottomMetric
            bottomMetricProps={{
              stepNum: 10,
              values: [0, 200, 400, 600, 800, "1000+"],
            }}
            // handleValueChange={handleValueChange} // avoid this, cause poor performace re-render
          />
        </View>

        <Text className="text-font-12 font-weight_300 px-4 text-right text-black opacity-60">
          {plotSize === maxValueLand ? `${plotSize}+ m²` : `${plotSize} m²`}
        </Text>

        <View
          className="relative mb-36 items-center justify-center"
          style={{ height: maxHeightLand }}
        >
          {numberOfRoom <= 5 ? (
            <HouseIcon
              className="absolute z-50"
              style={{ elevation: 50 }}
              width={70}
            />
          ) : (
            <HouseMultipleRoomIcon
              className="absolute z-50"
              style={{ elevation: 50 }}
              width={70}
            />
          )}
          <LandIcon
            width={handleSizeLand("width")}
            height={handleSizeLand("height")}
          />
        </View>

        <View className="px-12">
          <StepProgress width="w-4/12" />

          <Button
            title="Continue"
            onPress={handlePressNext}
            className="rounded-3xl"
          />
        </View>
      </KeyboardAwareScrollView>
    </SearchLayout>
  );
};
export default PlotSize;
