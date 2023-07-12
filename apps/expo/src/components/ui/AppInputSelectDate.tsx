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

import { AppText } from "./AppText";

export interface AppInputSelectDateProps extends TextInputProps {
  error?: string;
}

export const AppInputSelectDate = forwardRef<
  TextInput,
  AppInputSelectDateProps & ViewProps
>(function AppInputSelectDate(props, ref) {
  const { placeholder, error } = props;

  const innerRef = useRef<TextInput | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  return (
    <TouchableWithoutFeedback onPress={() => innerRef.current?.focus()}>
      <View>
        <View className={`rounded-l-2xl rounded-tr-2xl bg-white p-4 `}>
          <View className="flex w-full flex-row items-center ">
            <Text className="text-placeholder  text-font-16 -mt-0  w-4/12 ">
              {placeholder}
            </Text>
            <View className="flex flex-row items-center ">
              <View>
                <TouchableOpacity onPress={() => {}}>
                  <View className="flex w-10/12 flex-row items-center ">
                    <AppText
                      text="02 Jun"
                      className="font-weight_500 text-[16px] text-black"
                    />
                    <AppText
                      text="1973"
                      className="font-weight_500 text-grey ml-3 text-[18px]"
                    />
                  </View>
                </TouchableOpacity>
                <AppText
                  text="Birth year is Private "
                  className="font-weight_300 text-grey mt-1 text-[14px]"
                />
              </View>
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
            </View>
          </View>
        </View>
        {!error && (
          <Text className="text-red_1  -mt-1  pl-32">{error?.toString()}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
});
