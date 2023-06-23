/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import EvolutionIcon from "@assets/icons/EvolutionIcon.svg";

import { RangePicker, StepProgressButton } from "~/components/ui";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../routes";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "YearOfConstruction">;

const minValueYOC = 1950;
const maxValueYOC = new Date()?.getFullYear();

const YearOfConstruction = ({ navigation }: Props) => {
  // zustand
  const yearOfConstructionStart_zutand = useSearchWizardStore(
    (state) => state?.yearOfConstructionStart,
  );
  const yearOfConstructionEnd_zutand = useSearchWizardStore(
    (state) => state?.yearOfConstructionEnd,
  );
  const setYearOfConstructionStart_zutand = useSearchWizardStore(
    (state) => state?.setYearOfConstructionStart,
  );
  const setYearOfConstructionEnd_zutand = useSearchWizardStore(
    (state) => state?.setYearOfConstructionEnd,
  );

  // functions
  const handleTouchEnd = useCallback((lowValue: number, hightValue: number) => {
    setYearOfConstructionEnd_zutand(hightValue);

    if (lowValue < 10) {
      setYearOfConstructionStart_zutand(5); // minimum 5km for now
      return;
    }
    setYearOfConstructionStart_zutand(lowValue);
  }, []);

  const handlePressNext = () => {
    navigation.navigate("Availability");
  };

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
              Baujahr
            </Text>
            <Text className="text-black_1 text-font-12 font-weight_300 opacity-60">
              Welches Baujahr soll deine Immobilie haben?
            </Text>
          </View>
        </View>

        <View className="mb-8 px-4">
          <RangePicker
            min={minValueYOC}
            max={maxValueYOC}
            rangeDisabled={false}
            lowProp={yearOfConstructionStart_zutand}
            highProp={yearOfConstructionEnd_zutand}
            onSliderTouchEnd={handleTouchEnd}
            showBottomMetric
            bottomMetricProps={{
              stepNum: 10,
              values: ["<1950", 1980, 1990, 2000, 2010, `${maxValueYOC}+`],
            }}
            // handleValueChange={handleValueChange} // avoid this, cause poor performace re-render
          />
        </View>

        <Text className="text-font-12 font-weight_300 mb-8 px-4 text-right text-black opacity-60">
          {yearOfConstructionStart_zutand === minValueYOC
            ? `<${yearOfConstructionStart_zutand}`
            : yearOfConstructionStart_zutand}{" "}
          to{" "}
          {yearOfConstructionEnd_zutand === maxValueYOC
            ? `+${yearOfConstructionEnd_zutand}`
            : yearOfConstructionEnd_zutand}
        </Text>

        <View className="mb-72 items-center">
          <EvolutionIcon />
        </View>
      </KeyboardAwareScrollView>

      <StepProgressButton
        title="Continue"
        progress={70}
        onPress={handlePressNext}
      />
    </SearchLayout>
  );
};
export default YearOfConstruction;
