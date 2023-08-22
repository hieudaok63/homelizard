import React, { useRef, useState } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

import { generateBoxShadowStyle } from "~/utils/helpers";

export const styleBoxShadowSwitch = generateBoxShadowStyle("shadowBtn");

interface ICustomSwitch {
  onValueChange: (value: boolean) => void;
  offLabel: string;
  onLabel: string;
  defaultValue?: boolean;
}

export const CustomSwitch = ({
  onValueChange,
  offLabel,
  onLabel,
  defaultValue = false,
}: ICustomSwitch) => {
  const [isEnabled, setIsEnabled] = useState(defaultValue);
  const toggleAnimation = useRef(
    new Animated.Value(defaultValue ? 1 : 0),
  ).current;

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    Animated.timing(toggleAnimation, {
      toValue: isEnabled ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    onValueChange(!isEnabled);
  };

  const toggleTranslateX = toggleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 75],
  });

  const labelTranslateX = toggleTranslateX.interpolate({
    inputRange: [0, 30],
    outputRange: [13, 0],
  });

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleSwitch}
        className="mr-3 flex w-full flex-row items-center rounded-full bg-white px-6 py-1 pr-7"
        style={styleBoxShadowSwitch}
      >
        <Animated.View
          style={[{ transform: [{ translateX: toggleTranslateX }] }]}
          className="-ml-5 h-10 w-10 rounded-full bg-black"
        />
        <Animated.Text
          style={[{ transform: [{ translateX: labelTranslateX }] }]}
          className="text-font-16 font-weight_400"
        >
          {isEnabled ? onLabel : offLabel}
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};
