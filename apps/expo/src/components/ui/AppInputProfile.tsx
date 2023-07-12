import React, { forwardRef, useRef, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  type KeyboardTypeOptions,
  type ReturnKeyTypeOptions,
  type StyleProp,
  type TextInputProps,
  type ViewProps,
  type ViewStyle,
} from "react-native";

import { cn } from "@homelizard/tailwind-config/utils";

import ArrowRightIcon from "@assets/icons/ArrowRightIcon.svg";
import CloseIcon from "@assets/icons/CloseIcon.svg";

import { AppText } from "./AppText";

export interface AppInputProfileProps extends TextInputProps {
  label?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  returnKeyType?: ReturnKeyTypeOptions | undefined;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  multiline?: boolean;
  inputGrey?: boolean;
  onFocusCallback?: () => void;
  onInputPressIn?: () => void;
  rightIconProps?: React.ReactNode;
  classIconRight?: string;
  inputPhoneNumber?: boolean;
}

export const AppInputProfile = forwardRef<
  TextInput,
  AppInputProfileProps & ViewProps
>(function AppInputProfile(props, ref) {
  const {
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    maxLength,
    keyboardType,
    error,
    returnKeyType,

    autoCapitalize,

    multiline,

    onFocusCallback,
    onInputPressIn,
    onBlur,

    classIconRight,
    rightIconProps,
    inputPhoneNumber,
    inputGrey,
  } = props;
  const [isFocus, setFocus] = useState(false);
  const innerRef = useRef<TextInput | null>(null);

  return (
    <TouchableWithoutFeedback onPress={() => innerRef.current?.focus()}>
      <>
        {inputPhoneNumber && (
          <View className=" ml-5 flex  w-4/12  flex-row items-center  justify-between ">
            <TouchableOpacity className="bg-grey_4 w-10 rounded-full p-2">
              <CloseIcon />
            </TouchableOpacity>

            <TouchableOpacity className=" flex  w-6/12  flex-row items-center  justify-between">
              <AppText text="Mobile" className=" text-blue_2 text-font-18" />
              <ArrowRightIcon width={30} height={30} fill="#007AFF" />
            </TouchableOpacity>
          </View>
        )}
        <View
          className={cn(
            "flex w-full flex-row items-center bg-white p-4 ",
            inputGrey && "bg-grey_3",
          )}
        >
          {label && (
            <Text
              className={cn(
                "text-font-16 text-grey -mt-0 w-4/12",
                inputGrey && "w-5/12",
              )}
            >
              {label}
            </Text>
          )}

          <TextInput
            ref={(node) => {
              innerRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            placeholder={!isFocus ? placeholder : undefined}
            className={cn(
              "font-weight_600 text-font-16 border-color_gray ml-1  border-b p-2",
              rightIconProps ? "w-6/12" : "w-7/12",
            )}
            placeholderTextColor="#828282"
            onFocus={() => {
              setFocus(true);
              if (onFocusCallback) onFocusCallback();
            }}
            onBlur={(e) => {
              setFocus(false);
              if (onBlur) onBlur(e);
            }}
            value={value}
            onChangeText={onChangeText}
            multiline={multiline || false}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            onPressIn={onInputPressIn}
          />

          {rightIconProps && (
            <View className={cn("pl-2", classIconRight)}>{rightIconProps}</View>
          )}
        </View>
        {error && (
          <Text className="text-red_1 mt-1 pl-52">{error?.toString()}</Text>
        )}
      </>
    </TouchableWithoutFeedback>
  );
});
