import React, { useState, type ReactNode } from "react";
import { Platform, TouchableOpacity } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
  type AndroidNativeProps,
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { PopupModal } from "../ui/PopupModal";

type IProps = {
  children: ReactNode;
  onChange: (e: DateTimePickerEvent) => void;
  value: Date;
};

export const TriggerDatePicker = (props: IProps) => {
  const { children, value, onChange } = props;
  const [showIOSDatePicker, setShowIOSDatePicker] = useState<boolean>(false);

  const datePickerProps: AndroidNativeProps = {
    value,
    onChange,
    mode: "date",
    display: "spinner",
  };

  const handleTriggerDatePicker = () => {
    // for ios
    if (Platform.OS === "ios") {
      setShowIOSDatePicker(true);
      return;
    }
    // for android
    DateTimePickerAndroid.open(datePickerProps);
  };

  return (
    <>
      <TouchableOpacity onPress={handleTriggerDatePicker}>
        {children}
      </TouchableOpacity>

      {showIOSDatePicker ? (
        <PopupModal
          modalVisible={showIOSDatePicker}
          hideModal={() => setShowIOSDatePicker(false)}
          top="30%"
        >
          <DateTimePicker {...datePickerProps} />
        </PopupModal>
      ) : null}
    </>
  );
};
