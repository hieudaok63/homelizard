import React, { forwardRef, useRef } from "react";
import { Text, TextInput, View } from "react-native";

import { AppText } from "../../AppText";
import { type AppInputProps } from "./types";

export const InputInline = forwardRef<TextInput, AppInputProps>(
  function InputDefault(props, ref) {
    const { error, label } = props;

    const innerRef = useRef<TextInput | null>(null);

    return (
      <View>
        <View className="flex flex-row items-center bg-white p-3 pt-2">
          {label && (
            <AppText
              text={label}
              className="mx-1 w-4/12 text-font-14 text-grey"
              numberOfLines={1}
            />
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
            className="flex-1 border-b border-color_gray p-2 text-font-16 font-weight_600 text-black"
            placeholderTextColor="#828282"
          />
        </View>
        {error && (
          <Text className="text-red_1 mb-2 pl-4">{error?.toString()}</Text>
        )}
      </View>
    );
  },
);
