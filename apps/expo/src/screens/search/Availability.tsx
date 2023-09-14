import React, { useMemo } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
  type AndroidNativeProps,
} from "@react-native-community/datetimepicker";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { generateBoxShadowStyle } from "~/utils/helpers";
import { StepProgressButton } from "~/components/ui";
import { getCountScreen } from "~/utils";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../RootStackParams";
import { SearchLayout } from "./_layout";

export const styleBoxShadow = generateBoxShadowStyle("shadowDate");

type Props = NativeStackScreenProps<RootStackParams, "Availability">;

const Availability = ({ navigation }: Props) => {
  const { t } = useTranslation("search");
  // zustand
  const availabilityDate_zutand = useSearchWizardStore(
    (state) => state?.availabilityDate,
  );
  const setAvailabilityDate_zutand = useSearchWizardStore(
    (state) => state?.setAvailabilityDate,
  );

  // functions
  const handlePressNext = () => {
    // navigation.navigate("ObjectStyle");
    // hidden for now - WD-138
    navigation.navigate("Results");
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
      <View>
        <View className="mb-4 px-8">
          <Text className="text-font-18 font-weight_800 text-black_1">
            {t("search.label.weSearch")}
          </Text>

          <View className="mt-5">
            <Text className="mb-1 text-font-14 font-weight_800 text-black_1">
              {t("search.label.availability")}
            </Text>
            <Text className="text-font-12 font-weight_300 text-black_1 opacity-60">
              {t("search.text.availability")}
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
              style={styleBoxShadow}
            >
              <Text className="text-5xl font-weight_400 text-black">
                {dayjs(availabilityDate_zutand).format("DD | MM | YYYY")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="my-32">
            <DateTimePicker {...datePickerProps} />
          </View>
        )}
      </View>

      <StepProgressButton
        title={t("general.button.continue")}
        progress={getCountScreen("Availability")}
        onPress={handlePressNext}
        variant="turquoise"
      />
    </SearchLayout>
  );
};
export default Availability;
