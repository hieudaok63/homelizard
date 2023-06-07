/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useEffect } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MapView, { Circle, Marker, type MapPressEvent } from "react-native-maps";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppInput, Button, RangePicker, StepProgress } from "~/components/ui";
import { useLocation } from "~/hooks/useLocation";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../routes";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "Location">;

const latitudeDeltaConst = 2;
const longitudeDeltaConst = 2;
const minValueRadius = 0;
const maxValueRadius = 100;
const minimumAcceptedValueRadius = 5;

const Location = ({ navigation }: Props) => {
  const location = useLocation();

  // zustand
  const latitude = useSearchWizardStore((state) => state?.latitude);
  const longitude = useSearchWizardStore((state) => state?.longitude);
  const radius = useSearchWizardStore((state) => state?.radius);

  const setLatLng = useSearchWizardStore((state) => state?.setLatLng);
  const setRadius = useSearchWizardStore((state) => state?.setRadius);

  // functions
  const handlePressNext = useCallback(() => {
    navigation.navigate("PlotSize");
  }, []);

  const handleTouchEnd = useCallback((lowValue: number) => {
    if (lowValue < minimumAcceptedValueRadius) {
      setRadius(minimumAcceptedValueRadius); // minimum 5km for now
      return;
    }
    setRadius(lowValue);
  }, []);

  const handlePressMap = useCallback((e: MapPressEvent) => {
    if (!e?.nativeEvent) return;

    setLatLng(
      e?.nativeEvent?.coordinate?.latitude,
      e?.nativeEvent?.coordinate?.longitude,
    );
  }, []);

  // effects
  useEffect(() => {
    // only initialize with users location if no LatLng has been set yet.
    if (location && !latitude && !longitude) {
      setLatLng(location?.latitude, location?.longitude);
    }
  }, [location]);

  // main return
  return (
    <SearchLayout>
      <KeyboardAwareScrollView>
        <View className="mb-2 px-8">
          <Text className="font-weight_800 text-font-18 text-black_1">
            Wir finden für dich
          </Text>

          <Text className="text-black_1 text-font-14 font-weight_800 mb-1 mt-2">
            Wo suchst du?
          </Text>
        </View>

        <View className="mb-2 w-full flex-row items-center px-8">
          <Text className=" text-black_1 text-font-12 font-weight_300 basis-1/4 opacity-60">
            Land
          </Text>
          <View className="flex-1 pl-2">
            <AppInput placeholder="Land" />
          </View>
        </View>

        <Text className="text-black_1 font-weight_800 text-font-14 mb-1 pl-8">
          Umkreis
        </Text>

        <View className="mb-9 px-4">
          <RangePicker
            min={minValueRadius}
            max={maxValueRadius}
            rangeDisabled={true}
            lowProp={radius}
            onSliderTouchEnd={handleTouchEnd}
            showBottomMetric
            bottomMetricProps={{
              stepNum: 10,
              values: [0, 20, 40, 60, 80, 100],
            }}
            // handleValueChange={handleValueChange} // avoid this, cause poor performace re-render
          />
        </View>

        <Text className="text-font-12 font-weight_300 px-4 text-right text-black opacity-60">
          {radius === maxValueRadius ? `${radius}km +` : `${radius}km`}
        </Text>

        <View className="mb-14 px-8">
          <View className="aspect-square overflow-hidden rounded-full">
            <MapView
              className="h-full w-full"
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: latitudeDeltaConst,
                longitudeDelta: longitudeDeltaConst,
              }}
              onPress={handlePressMap}
            >
              {latitude && longitude && location && (
                <>
                  <Marker
                    coordinate={{
                      latitude: latitude,
                      longitude: longitude,
                    }}
                  />
                  <Circle
                    center={{
                      latitude: latitude,
                      longitude: longitude,
                    }}
                    radius={radius * 1000}
                    fillColor="rgba(74, 176, 247, 0.5)"
                    strokeColor="rgba(130, 130, 130, 0.5)"
                  />
                </>
              )}
            </MapView>
          </View>
        </View>

        <View className="px-12">
          <StepProgress width="w-2/12" />
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
export default Location;
