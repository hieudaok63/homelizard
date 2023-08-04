import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Circle, Marker, type MapPressEvent } from "react-native-maps";
import * as LocationExpo from "expo-location";

import SearchIcon from "@assets/icons/SearchIcon.svg";

import { AppInput, RangePicker } from "~/components/ui";
import { useLocation } from "~/hooks/useLocation";
import {
  locationSlice,
  useApplicationLoadingStore,
  useSearchWizardStore,
} from "~/zustand/store";
import { LayoutBasicInfo } from "./_layout";

const latitudeDeltaConst = 2;
const longitudeDeltaConst = 2;
const minValueRadius = 0;
const maxValueRadius = 30;
const minimumAcceptedValueRadius = 0;
const ONE_DEGREE_OF_LATITUDE_IN_KM = 111.32;

export const LocationSection = () => {
  const mapRef = React.useRef<MapView>(null);
  const { location: userLocation, locationLoaded } = useLocation();

  // local states
  const [address, setAddress] = useState<string | null>();

  const { setAddressParam, setAddressUser } = locationSlice((state) => state);

  // zustand
  const location = useSearchWizardStore((state) => state?.location);

  const radius = useSearchWizardStore((state) => state?.radius);

  const setLocation = useSearchWizardStore((state) => state?.setLocation);
  const setRadius = useSearchWizardStore((state) => state?.setRadius);
  const setLoading = useApplicationLoadingStore((state) => state.setLoading);

  // functions

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
    async (e: MapPressEvent) => {
      if (!e?.nativeEvent) return;
      setLocation(e?.nativeEvent?.coordinate);

      const detailLocation = await LocationExpo?.reverseGeocodeAsync({
        latitude: e.nativeEvent?.coordinate.latitude,
        longitude: e.nativeEvent?.coordinate.longitude,
      });

      setAddressUser({
        latitude: location?.latitude,
        longitude: location?.longitude,
        city: detailLocation[0]?.city,
        country: detailLocation[0]?.country,
        zipCode: detailLocation[0]?.postalCode,
        street: detailLocation[0]?.street,
        name: detailLocation[0]?.name,
      });

      setAddressParam({
        city: detailLocation[0]?.city,
        country: detailLocation[0]?.country,
        zipCode: detailLocation[0]?.postalCode,
        street: detailLocation[0]?.street,
      });

      const nameAddress = detailLocation[0]?.name;

      setAddress(nameAddress);
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
        const detailLotion = await LocationExpo?.reverseGeocodeAsync({
          latitude: latitude,
          longitude: longitude,
        });

        setAddressUser({
          latitude: location?.latitude,
          longitude: location?.longitude,
          city: detailLotion[0]?.city,
          country: detailLotion[0]?.country,
          zipCode: detailLotion[0]?.postalCode,
          street: detailLotion[0]?.street,
          name: detailLotion[0]?.name,
        });

        setAddressParam({
          city: detailLotion[0]?.city,
          country: detailLotion[0]?.country,
          zipCode: detailLotion[0]?.postalCode,
          street: detailLotion[0]?.street,
        });
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

  return (
    <LayoutBasicInfo>
      <View className="mb-2 w-full flex-row items-center ">
        <Text className=" basis-1/4 text-font-12 font-weight_300 text-black_1 opacity-60">
          Suche
        </Text>
        <View className="w-full flex-1 flex-row items-center pl-2">
          <AppInput
            placeholder="Suche"
            className="mr-2 flex-1"
            value={address}
            onChangeText={setAddress}
            onSubmitEditing={handlePressSearch}
            returnKeyType="search"
          />
          <TouchableOpacity
            className="rounded-full bg-green p-2"
            onPress={handlePressSearch}
          >
            <SearchIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mb-9">
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

      <Text className="px-4 text-right text-font-12 font-weight_300 text-black ">
        {radius === maxValueRadius ? `${radius}km +` : `${radius}km`}
      </Text>

      <View className="mb-12">
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
    </LayoutBasicInfo>
  );
};
