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

export interface AppInputProfileProps extends TextInputProps {
  label?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  touched?: boolean;
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
  onPressRightInput?: () => void;
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
    onPressRightInput,
    classIconRight,
    rightIconProps,
    inputGrey,
  } = props;
  const [isFocus, setFocus] = useState(false);
  const innerRef = useRef<TextInput | null>(null);

  return (
    <TouchableWithoutFeedback onPress={() => innerRef.current?.focus()}>
      <>
        <View
          className={cn(
            "flex w-full flex-row items-center bg-white p-4 ",
            inputGrey && "bg-grey_3",
          )}
        >
          {label && (
            <Text
              className={cn(
                "w-4/12 text-font-16 text-grey",
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
              "ml-1 border-b border-color_gray p-2 text-font-16 font-weight_600",
              rightIconProps ? "w-6/12" : "w-7/12",
              !label ? "w-full" : "",
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
            <TouchableOpacity
              onPress={onPressRightInput}
              className={cn("pl-2", classIconRight)}
            >
              {rightIconProps}
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <Text className="text-red_1 mt-1 pl-52">{error?.toString()}</Text>
        )}
      </>
    </TouchableWithoutFeedback>
  );
});
