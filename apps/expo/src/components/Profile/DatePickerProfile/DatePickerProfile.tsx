import React, { useMemo } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
  type AndroidNativeProps,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

import { generateBoxShadowStyle } from "~/utils/helpers";
import { PopupModal } from "~/components/ui";

export const styleBoxShadow = generateBoxShadowStyle("shadowDate");

interface IDatePickerProfile {
  showDatePicker: boolean;
  setShowDatePicker: (value: React.SetStateAction<boolean>) => void;
  setValueDate?: any;
}

export const DatePickerProfile = ({
  showDatePicker,
  setShowDatePicker,
  setValueDate,
}: IDatePickerProfile) => {
  const datePickerProps: AndroidNativeProps = useMemo(
    () => ({
      value: new Date(),

      onChange: (e) => {
        if (e?.nativeEvent?.timestamp) {
          setValueDate(new Date(e?.nativeEvent?.timestamp));
        }
      },
      mode: "date",
      display: Platform?.OS === "ios" ? "spinner" : "spinner",
    }),
    [],
  );

  return (
    <PopupModal
      modalVisible={showDatePicker}
      hideModal={() => {
        setShowDatePicker(false);
      }}
      top="30%"
    >
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
              {dayjs("01|02|2000").format("DD | MM | YYYY")}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <DateTimePicker {...datePickerProps} />
      )}
    </PopupModal>
  );
};
