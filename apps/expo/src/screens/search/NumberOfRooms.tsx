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

type Props = NativeStackScreenProps<RootStackParams, "NumberOfRooms">;

const maxValueRoomNum = 10;
const minValueRoomNum = 0;
const minimunAcceptedValueRoomNum = 0;

const NumberOfRooms = ({ navigation }: Props) => {
  const numberOfRoom = useSearchWizardStore((state) => state?.numberOfRooms);
  const livingArea = useSearchWizardStore((state) => state?.livingArea);
  const plotSize = useSearchWizardStore((state) => state?.plotSize);
  const { t } = useTranslation("search");
  const setNumberOfRoom = useSearchWizardStore(
    (state) => state?.setNumberOfRooms,
  );

  // functions
  const handleTouchEnd = useCallback((lowValue: number) => {
    setNumberOfRoom(Math.max(lowValue, minimunAcceptedValueRoomNum));
  }, []);

  const handlePressNext = useCallback(() => {
    // navigation.navigate("YearOfConstruction");
    // hidden for now  WD-158
    navigation.navigate("PriceRange");
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
              {t("search.label.numberOfRoom")}
            </Text>
            <Text className="text-font-12 font-weight_300 text-black_1 opacity-60">
              {t("search.text.numberOfRoom")}
            </Text>
          </View>
        </View>

        <View className="mb-9 px-4">
          <RangePicker
            min={minValueRoomNum}
            max={maxValueRoomNum}
            rangeDisabled={true}
            lowProp={numberOfRoom}
            // onSliderTouchEnd={handleTouchEnd}
            showBottomMetric
            bottomMetricProps={{
              stepNum: 10,
              values: [0, 2, 4, 6, 8, "10+"],
            }}
            handleValueChange={handleTouchEnd} // avoid this, cause poor performace re-render
          />
        </View>

        <HouseMultipleRoom
          numberOfRoom={numberOfRoom}
          classImage="absolute z-50"
          style={{ elevation: 50 }}
          livingArea={livingArea}
          plotSize={plotSize}
          value={
            numberOfRoom === maxValueRoomNum
              ? `${numberOfRoom}+ ${t("search.text.number")}`
              : `${numberOfRoom} ${t("search.text.number")}`
          }
        />
      </View>

      <StepProgressButton
        title={t("general.button.continue")}
        progress={getCountScreen("NumberOfRooms")}
        onPress={handlePressNext}
        variant="turquoise"
      />
    </SearchLayout>
  );
};
export default NumberOfRooms;
