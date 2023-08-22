import React, { useCallback, useEffect, useRef } from "react";
import { Animated, type StyleProp, type ViewStyle } from "react-native";

import {
  MyHouseIcon1,
  MyHouseIcon2,
  MyHouseIcon3,
  MyHouseIcon4,
  MyHouseIcon5,
  MyHouseIcon6,
  MyHouseIcon7,
  MyHouseIcon8,
  MyHouseIcon9,
  MyHouseIcon10,
} from "@assets/icons";

interface AnimatedHouseProps {
  classImage?: string;
  classContainer?: string;
  style?: StyleProp<ViewStyle>;
  numberOfRoom?: number;
  livingArea?: number;
  plotSize?: number;
  onSuccess: () => void;
}
// Living
const minWidthLiving = 61;
const minHeightLiving = 61;
const maxWidthLiving = 270;
const maxHeightLiving = 220;
const maxValueLiving = 400;

const HouseIcons = [
  MyHouseIcon1,
  MyHouseIcon2,
  MyHouseIcon3,
  MyHouseIcon4,
  MyHouseIcon5,
  MyHouseIcon6,
  MyHouseIcon7,
  MyHouseIcon8,
  MyHouseIcon9,
  MyHouseIcon10,
];

export const AnimatedHouse = (props: AnimatedHouseProps) => {
  const {
    classImage,
    classContainer,
    style,
    numberOfRoom = 1,
    livingArea = 0,
    onSuccess,
  } = props;
  //   function
  const handleSizeLand = useCallback(
    (params: "width" | "height") => {
      if (params === "width") {
        const width = maxWidthLiving * (livingArea / maxValueLiving);
        if (width < minWidthLiving) return minWidthLiving;
        return width;
      }

      if (params === "height") {
        const height = maxHeightLiving * (livingArea / maxValueLiving);
        if (height < minHeightLiving) return minHeightLiving;
        return height;
      }
    },
    [livingArea],
  );
  const moveTopImage = useRef(new Animated.Value(0)).current;

  const RenderHouseImage = useCallback(() => {
    const numRooms = numberOfRoom < 1 || numberOfRoom > 10 ? 1 : numberOfRoom;
    const HouseIcon = HouseIcons[numRooms - 1]!;
    return (
      <HouseIcon
        className={classImage}
        width={handleSizeLand("width")}
        height={handleSizeLand("height")}
        style={style}
      />
    );
  }, [numberOfRoom, handleSizeLand, classImage, style]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(moveTopImage, {
        toValue: handleSizeLand("height") || 0,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setTimeout(() => {
        onSuccess();
      }, 2000);
    });
  }, []);

  return (
    <Animated.View
      className={classContainer}
      style={[
        {
          overflow: "hidden",

          height: moveTopImage,
        },
      ]}
    >
      <RenderHouseImage />
    </Animated.View>
  );
};
