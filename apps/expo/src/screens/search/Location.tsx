import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MapView, { Circle, Marker, type MapPressEvent } from "react-native-maps";
import * as LocationExpo from "expo-location";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import SearchIcon from "@assets/icons/SearchIcon.svg";

import { InputDefault, RangePicker, StepProgressButton } from "~/components/ui";
import { useLocation } from "~/hooks/useLocation";
import {
  useApplicationLoadingStore,
  useSearchWizardStore,
} from "~/zustand/store";
import { type RootStackParams } from "../RootStackParams";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "Location">;

const latitudeDeltaConst = 2;
const longitudeDeltaConst = 2;
const minValueRadius = 0;
const maxValueRadius = 30;
const minimumAcceptedValueRadius = 0;
const ONE_DEGREE_OF_LATITUDE_IN_KM = 111.32;

const Location = ({ navigation }: Props) => {
  const mapRef = React.useRef<MapView>(null);
  const { location: userLocation, locationLoaded } = useLocation();

  // local states
  const [address, setAddress] = useState<string>();

  // zustand
  const location = useSearchWizardStore((state) => state?.location);
  const radius = useSearchWizardStore((state) => state?.radius);

  const setLocation = useSearchWizardStore((state) => state?.setLocation);
  const setRadius = useSearchWizardStore((state) => state?.setRadius);
  const setLoading = useApplicationLoadingStore((state) => state.setLoading);

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
      if (!e?.nativeEvent) return;
      setLocation(e?.nativeEvent?.coordinate);
    },
    [setLocation],
  );

  const handlePressSearch = async () => {
    if (!address) return;

    try {
      setLoading(true);
      const result = await LocationExpo?.geocodeAsync(address);

      if (result?.[0]) {
        const { latitude, longitude } = result[0];
        setLocation({ latitude, longitude });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
          <Text className="text-font-18 font-weight_800 text-black_1">
            Wir finden für dich
          </Text>

          <Text className="mb-1 mt-2 text-font-14 font-weight_800 text-black_1">
            Wo suchst du?
          </Text>
        </View>

        <View className="mb-2 w-full flex-row items-center px-8">
          <View className="mr-2 flex-1">
            <InputDefault
              placeholder="Suche"
              value={address}
              onChangeText={setAddress}
              onSubmitEditing={handlePressSearch}
              returnKeyType="search"
            />
          </View>
          <TouchableOpacity
            className="rounded-full bg-green p-2"
            onPress={handlePressSearch}
          >
            <SearchIcon />
          </TouchableOpacity>
        </View>

        <Text className="mb-1 pl-8 text-font-14 font-weight_800 text-black_1">
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
              values: [0, 6, 12, 18, 24, 30],
            }}
          />
        </View>

        <Text className="px-4 text-right text-font-12 font-weight_300 text-black opacity-60">
          {radius === maxValueRadius ? `${radius}km +` : `${radius}km`}
        </Text>

        <View className="mb-12 px-8">
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
      </KeyboardAwareScrollView>
      <StepProgressButton
        title="Continue"
        progress={30}
        onPress={handlePressNext}
        variant="turquoise"
      />
    </SearchLayout>
  );
};
export default Location;
