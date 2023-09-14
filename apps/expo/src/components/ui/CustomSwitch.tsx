import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  ImageSourcePropType,
  NativeSyntheticEvent,
  TextLayoutEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { useAssets } from "expo-asset";

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
  const [widthText, setWidthText] = useState(0);
  const toggleAnimation = useRef(
    new Animated.Value(defaultValue ? 1 : 0),
  ).current;
  const [backgroundSwitch] = useAssets([
    require("@assets/backgroundSwitch.png"),
  ]);
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
    outputRange: [8, widthText < 94 ? 86 : widthText + 25],
  });

  const labelTranslateX = toggleTranslateX.interpolate({
    inputRange: [0, 60],
    outputRange: [30, 0],
    extrapolate: "clamp",
  });
  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      setWidthText(e.nativeEvent.lines[0]?.width || 0);
    },
    [],
  );
  if (!backgroundSwitch) return null;
  return (
    <ImageBackground
      resizeMode={"contain"}
      source={backgroundSwitch as ImageSourcePropType}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleSwitch}
        className="w-full min-w-[134px] flex-row items-center rounded-full py-1"
      >
        <Animated.View
          style={[{ transform: [{ translateX: toggleTranslateX }] }]}
          className="h-10 w-10 rounded-full bg-black"
        />
        <Animated.Text
          onTextLayout={onTextLayout}
          style={[{ transform: [{ translateX: labelTranslateX }] }]}
          className="text-font-16 font-weight_400"
        >
          {isEnabled ? onLabel : offLabel}
        </Animated.Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
