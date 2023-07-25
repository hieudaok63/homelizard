import React, { forwardRef, useRef, useState } from "react";
import {
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  type TextInput,
  type TextInputProps,
  type ViewProps,
} from "react-native";
import dayjs from "dayjs";

import { cn } from "@homelizard/tailwind-config/utils";

import { AppText } from "./AppText";

export interface AppInputSelectDateProps extends TextInputProps {
  error?: string;
  value: string;
  onPressSelectDate?: () => void;
  onSwitch?: boolean;
}

export const AppInputSelectDate = forwardRef<
  TextInput,
  AppInputSelectDateProps & ViewProps
>(function AppInputSelectDate(props, ref) {
  const { onSwitch, placeholder, error, value, onPressSelectDate } = props;

  const innerRef = useRef<TextInput | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  return (
    <TouchableWithoutFeedback onPress={() => innerRef.current?.focus()}>
      <View>
        <View className="ml-1 rounded-l-2xl rounded-tr-2xl bg-white p-4">
          <View className="flex w-full flex-row items-center ">
            <Text className="-mt-0 w-4/12 text-font-16 text-placeholder ">
              {placeholder}
            </Text>
            <View className="flex flex-row items-center ">
              <View className={cn(onSwitch ? "w-7/12" : "w-9/12")}>
                <TouchableOpacity onPress={onPressSelectDate}>
                  <View
                    className={cn(
                      "flex flex-row items-center border-b border-color_gray ",
                      onSwitch ? "w-10/12" : "w-full",
                    )}
                  >
                    <AppText
                      text={dayjs(value).format("DD | MM | YYYY")}
                      className="mb-2 text-[16px] font-weight_500 text-black"
                    />
                  </View>
                </TouchableOpacity>
                {onSwitch && (
                  <AppText
                    text="Birth year is Private "
                    className="mt-1 text-[14px] font-weight_300 text-grey"
                  />
                )}
              </View>
              {onSwitch && (
                <Switch
                  value={isEnabled}
                  onValueChange={(val) => {
                    setIsEnabled(val);
                  }}
                  ios_backgroundColor="rgba(120, 120, 128, 0.32)"
                  trackColor={{
                    false: "rgba(120, 120, 128, 0.32)",
                    true: "#F4B512",
                  }}
                  thumbColor="#000000"
                  className="ml-5"
                />
              )}
            </View>
          </View>
        </View>
        {!error && (
          <Text className="text-red_1 -mt-1 pl-32">{error?.toString()}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
});
