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

type Props = NativeStackScreenProps<RootStackParams, "NumberOfRooms">;

const maxHeightRoomNum = 300;

const maxValueRoomNum = 10;
const minValueRoomNum = 0;
const minimunAcceptedValueRoomNum = 1;

const NumberOfRooms = ({ navigation }: Props) => {
  const numberOfRoom = useSearchWizardStore((state) => state?.numberOfRooms);
  const setNumberOfRoom = useSearchWizardStore(
    (state) => state?.setNumberOfRooms,
  );

  // functions
  const handleTouchEnd = useCallback((lowValue: number) => {
    setNumberOfRoom(Math.max(lowValue, minimunAcceptedValueRoomNum));
  }, []);

  const handlePressNext = useCallback(() => {
    navigation.navigate("YearOfConstruction");
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
              Anzahl Räume
            </Text>
            <Text className="text-black_1 text-font-12 font-weight_300 opacity-60">
              Wieviel Räume sollten es sein?
            </Text>
          </View>
        </View>

        <View className="mb-9 px-4">
          <RangePicker
            min={minValueRoomNum}
            max={maxValueRoomNum}
            rangeDisabled={true}
            lowProp={numberOfRoom}
            onSliderTouchEnd={handleTouchEnd}
            showBottomMetric
            bottomMetricProps={{
              stepNum: 10,
              values: [0, 2, 4, 6, 8, "10+"],
            }}
            // handleValueChange={handleValueChange} // avoid this, cause poor performace re-render
          />
        </View>

        <Text className="text-font-12 font-weight_300 px-4 text-right text-black opacity-60">
          {numberOfRoom === maxValueRoomNum
            ? `${numberOfRoom}+ Räume`
            : `${numberOfRoom} Räume`}
        </Text>

        <View
          className="relative mb-36 items-center justify-center"
          style={{ height: maxHeightRoomNum }}
        >
          <LandIcon />
          {numberOfRoom <= 5 ? (
            <HouseIcon
              className="absolute z-50"
              style={{ elevation: 50 }}
              width={200}
              height={200}
            />
          ) : (
            <HouseMultipleRoomIcon
              className="absolute z-50"
              style={{ elevation: 50 }}
              width={200}
              height={200}
            />
          )}
        </View>

        <View className="px-12">
          <StepProgress width="w-6/12" />

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
export default NumberOfRooms;
