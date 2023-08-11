import React, { forwardRef, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  type TextInput,
  type TextInputProps,
  type ViewProps,
} from "react-native";

import { AppText } from "./AppText";

export interface AppInputSelectGenderProps extends TextInputProps {
  error?: string;
  value: string;
  onPressGender?: () => void;
}

export const AppInputSelectGender = forwardRef<
  TextInput,
  AppInputSelectGenderProps & ViewProps
>(function AppInputSelectGender(props, ref) {
  const { placeholder, error, value, onPressGender } = props;

  const innerRef = useRef<TextInput | null>(null);

  return (
    <TouchableWithoutFeedback onPress={() => innerRef.current?.focus()}>
      <View>
        <View className="flex w-full flex-row items-center border-b border-color_gray bg-white p-4">
          <View className=" flex w-full flex-row items-center">
            <Text className="-mt-0  w-4/12 text-font-16  text-placeholder">
              {placeholder}
            </Text>
            <TouchableOpacity className="w-10/12 pl-1" onPress={onPressGender}>
              <AppText
                text={value}
                className="w-10/12 text-[18px] font-weight_500 text-black"
              />
            </TouchableOpacity>
          </View>
        </View>
        {error && (
          <Text className="text-red_1 pl-32  ">{error?.toString()}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
});
