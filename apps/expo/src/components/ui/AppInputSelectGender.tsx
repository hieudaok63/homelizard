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
}

export const AppInputSelectGender = forwardRef<
  TextInput,
  AppInputSelectGenderProps & ViewProps
>(function AppInputSelectGender(props, ref) {
  const { placeholder, error } = props;

  const innerRef = useRef<TextInput | null>(null);

  return (
    <TouchableWithoutFeedback onPress={() => innerRef.current?.focus()}>
      <View>
        <View className="border-color_gray flex w-full flex-row items-center rounded-l-2xl rounded-tr-2xl border-b bg-white p-4">
          <View className=" flex w-full flex-row items-center">
            <Text className="text-placeholder  text-font-16 -mt-0  w-4/12">
              {placeholder}
            </Text>
            <TouchableOpacity className="w-10/12 pl-1" onPress={() => {}}>
              <AppText
                text="Male"
                className="font-weight_500 w-10/12 text-[18px] text-black"
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
