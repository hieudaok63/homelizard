import React, { forwardRef, useRef, useState } from "react";
import {
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  type KeyboardTypeOptions,
  type ReturnKeyTypeOptions,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from "react-native";

export interface AppInputProps extends TextInputProps {
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
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  multiline?: boolean;
  className?: string;
  onFocusCallback?: () => void;
  onInputPressIn?: () => void;
}

export const AppInput = forwardRef<TextInput, AppInputProps & ViewProps>(
  function AppInput(props, ref) {
    const {
      label,
      value,
      onChangeText,
      placeholder,
      secureTextEntry,
      maxLength,
      keyboardType,
      error,
      touched,
      returnKeyType,
      containerStyle,
      style,
      autoCapitalize,
      inputStyle,
      labelStyle,
      multiline,
      inputContainerStyle,
      className,
      onFocusCallback,
      onInputPressIn,
    } = props;
    const [isFocus, setFocus] = useState(false);
    const innerRef = useRef<TextInput | null>(null);

    return (
      <TouchableWithoutFeedback onPress={() => innerRef.current?.focus()}>
        <View style={style} className={className}>
          <View className="rounded-l-2xl rounded-tr-2xl bg-white p-4">
            {(isFocus || value) && (
              <Text className="text-placeholder -mt-2 text-xs">
                {placeholder}
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
              className="font-weight_600 text-font-16 text-black"
              placeholderTextColor="#828282"
              onFocus={() => {
                setFocus(true);
                if (onFocusCallback) onFocusCallback();
              }}
              onBlur={() => setFocus(false)}
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
          </View>
          {error && (
            <Text className="mt-1 pl-2 text-red-700">{error?.toString()}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  },
);
