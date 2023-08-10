import React, { forwardRef, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";

import { type AppInputProps } from "./types";

export const InputDefault = forwardRef<TextInput, AppInputProps>(
  function InputDefault(props, ref) {
    const { placeholder, error, onFocus, onBlur, value } = props;

    const [isFocus, setIsFocus] = useState(false);
    const innerRef = useRef<TextInput | null>(null);

    return (
      <View>
        <View className="rounded-l-2xl rounded-tr-2xl bg-white p-4">
          {(isFocus || value) && (
            <Text className="-mt-2 text-xs text-placeholder">
              {placeholder}
            </Text>
          )}

          <TextInput
            {...props}
            ref={(node) => {
              innerRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            className="text-font-16 font-weight_600 text-black"
            placeholderTextColor="#828282"
            placeholder={!isFocus ? placeholder : ""}
            onFocus={(e) => {
              setIsFocus(true);
              if (onFocus) onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocus(false);
              if (onBlur) onBlur(e);
            }}
          />
        </View>
        {error && (
          <Text className="text-red_1 mb-2 pl-2">{error?.toString()}</Text>
        )}
      </View>
    );
  },
);
