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

type Props = NativeStackScreenProps<RootStackParams, "LivingArea">;

const minWidthLiving = 61;
const minHeightLiving = 61;
const maxWidthLiving = 300;
const maxHeightLiving = 300;

const maxValueLiving = 1000;
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
      <KeyboardAwareScrollView>
        <View className="mb-4 px-8">
          <Text className="font-weight_800 text-font-18 text-black_1">
            Wir finden für dich
          </Text>

          <View className="mt-5">
            <Text className="text-black_1 text-font-14 font-weight_800 mb-1">
              Wohnfläche
            </Text>
            <Text className="text-black_1 text-font-12 font-weight_300 opacity-60">
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
              values: [0, 200, 400, 600, 800, "1000+"],
            }}
            // handleValueChange={handleValueChange} // avoid this, cause poor performace re-render
          />
        </View>

        <Text className="text-font-12 font-weight_300 px-4 text-right text-black opacity-60">
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

        <View className="px-12">
          <StepProgress width="w-5/12" />

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
export default LivingArea;
