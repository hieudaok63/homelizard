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
const ONE_DEGREE_OF_LATITUDE_IN_KM = 111.32;

const Location = ({ navigation }: Props) => {
  const mapRef = React.useRef<MapView>(null);
  const { location: userLocation, locationLoaded } = useLocation();

  // zustand
  const location = useSearchWizardStore((state) => state?.location);
  const radius = useSearchWizardStore((state) => state?.radius);

  const setLocation = useSearchWizardStore((state) => state?.setLocation);
  const setRadius = useSearchWizardStore((state) => state?.setRadius);

  // functions
  const handlePressNext = () => {
    navigation.navigate("PlotSize");
  };

  const handleTouchEnd = useCallback(
    (lowValue: number) => {
      if (lowValue < minimumAcceptedValueRadius) {
        setRadius(minimumAcceptedValueRadius); // minimum 5km for now
        return;
      }
      setRadius(lowValue);
    },
    [setRadius],
  );

  const handlePressMap = useCallback(
    (e: MapPressEvent) => {
      console.log("mapPress", e.nativeEvent);
      if (!e?.nativeEvent) return;
      setLocation(e.nativeEvent.coordinate);
    },
    [setLocation],
  );

  // effects
  useEffect(() => {
    // only initialize with users location if no LatLng has been set yet.
    if (location || !locationLoaded) return;
    if (userLocation) {
      setLocation(userLocation);
      mapRef.current?.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: latitudeDeltaConst,
        longitudeDelta: longitudeDeltaConst,
      });
    }
  }, [locationLoaded, location, userLocation, setLocation, mapRef]);

  // animates the map to pan to the location of a new marker
  useEffect(() => {
    if (!location) return;

    const deltaWithPaddingInKm = (radius * 6) / 2;
    const latitudeInRadians = location.latitude * (Math.PI / 180);

    const latitudeDelta = deltaWithPaddingInKm / ONE_DEGREE_OF_LATITUDE_IN_KM;
    const longitudeDelta =
      deltaWithPaddingInKm /
      (ONE_DEGREE_OF_LATITUDE_IN_KM * Math.cos(latitudeInRadians));

    mapRef.current?.animateToRegion({
      ...location,
      latitudeDelta,
      longitudeDelta,
    });
  }, [location, radius, mapRef]);

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
          />
        </View>

        <Text className="text-font-12 font-weight_300 px-4 text-right text-black opacity-60">
          {radius === maxValueRadius ? `${radius}km +` : `${radius}km`}
        </Text>

        <View className="mb-14 px-8">
          <View className="aspect-square overflow-hidden rounded-full">
            <MapView
              ref={mapRef}
              className="h-full w-full"
              onPress={handlePressMap}
              rotateEnabled={false}
              pitchEnabled={false}
            >
              {location && (
                <>
                  <Marker coordinate={location} />
                  <Circle
                    center={location}
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
