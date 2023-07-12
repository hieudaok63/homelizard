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
      returnKeyType,
      style,
      autoCapitalize,
      multiline,
      className,
      onFocusCallback,
      onInputPressIn,
      onBlur,
    } = props;
    const [isFocus, setFocus] = useState(false);
    const innerRef = useRef<TextInput | null>(null);

    return (
      <TouchableWithoutFeedback onPress={() => innerRef.current?.focus()}>
        <View style={style} className={className}>
          <View className={`rounded-l-2xl rounded-tr-2xl bg-white p-4 `}>
            {(isFocus || value) && !label && (
              <Text className={`text-placeholder -mt-2 text-xs `}>
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
          </View>
          {error && (
            <Text className="text-red_1 mt-1 pl-2">{error?.toString()}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  },
);
