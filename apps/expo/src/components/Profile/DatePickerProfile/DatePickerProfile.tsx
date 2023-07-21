import React, { useMemo } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
  type AndroidNativeProps,
} from "@react-native-community/datetimepicker";

import { generateBoxShadowStyle } from "~/utils/helpers";
import { PopupModal } from "~/components/ui";

export const styleBoxShadow = generateBoxShadowStyle("shadowDate");

interface IDatePickerProfile {
  isShowModalVisible: boolean;
  setIsHideModalVisible: () => boolean;
}

export const DatePickerProfile = ({
  isShowModalVisible,
  setIsHideModalVisible,
}: IDatePickerProfile) => {
  const datePickerProps: AndroidNativeProps = useMemo(
    () => ({
      value: new Date(),
      onChange: (e) => {
        if (e?.nativeEvent?.timestamp) {
          console.log({ e: e?.nativeEvent?.timestamp });
        }
      },
      mode: "date",
      display: Platform?.OS === "ios" ? "spinner" : "spinner",
    }),
    [],
  );

  return (
    <PopupModal
      modalVisible={isShowModalVisible}
      hideModal={setIsHideModalVisible}
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
              {/* {dayjs("01|02|2000").format("DD | MM | YYYY")} */}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <DateTimePicker {...datePickerProps} />
      )}
    </PopupModal>
  );
};
