import React, { useMemo } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker, {
  DateTimePickerAndroid,
  type AndroidNativeProps,
} from "@react-native-community/datetimepicker";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";

import { generateBoxShadowStyle } from "~/utils/helpers";
import { Button, StepProgress } from "~/components/ui";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../routes";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "Availability">;

const Availability = ({ navigation }: Props) => {
  // zustand
  const availabilityDate_zutand = useSearchWizardStore(
    (state) => state?.availabilityDate,
  );
  const setAvailabilityDate_zutand = useSearchWizardStore(
    (state) => state?.setAvailabilityDate,
  );

  // functions
  const handlePressNext = () => {
    navigation.navigate("ObjectStyle");
  };

  const datePickerProps: AndroidNativeProps = useMemo(
    () => ({
      value: new Date(availabilityDate_zutand),
      onChange: (e) => {
        if (e?.nativeEvent?.timestamp)
          setAvailabilityDate_zutand(new Date(e?.nativeEvent?.timestamp));
      },
      minimumDate: new Date(),
      mode: "date",
      display: Platform?.OS === "ios" ? "spinner" : "spinner",
    }),
    [availabilityDate_zutand, setAvailabilityDate_zutand],
  );

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
              Verfügbarkeit
            </Text>
            <Text className="text-black_1 text-font-12 font-weight_300 opacity-60">
              Wann sollte die Immobilie verfügbar sein?
            </Text>
          </View>
        </View>

        {Platform?.OS === "android" ? (
          <View className="my-48 items-center justify-center">
            <TouchableOpacity
              onPress={() => {
                DateTimePickerAndroid?.open({ ...datePickerProps });
              }}
              className="rounded-md bg-white p-4"
              style={{
                ...generateBoxShadowStyle({
                  xOffset: 3,
                  yOffset: 2,
                  shadowColorIos: "#000000",
                  shadowOpacity: 0.16,
                  shadowRadius: 16,
                  elevation: 4,
                  shadowColorAndroid: "#000000",
                }),
              }}
            >
              <Text className="font-weight_400 text-5xl text-black">
                {dayjs(availabilityDate_zutand).format("DD | MM | YYYY")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="my-32">
            <DateTimePicker {...datePickerProps} />
          </View>
        )}

        <View className="px-12">
          <StepProgress width="w-9/12" />
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
export default Availability;
