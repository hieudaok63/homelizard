import React, { useCallback } from "react";
import { ImageBackground, StyleProp, View, ViewStyle } from "react-native";

import {
  LandIcon,
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

import { AppText } from "./AppText";

interface HouseMultipleRoomProps {
  classImage?: string;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  numberOfRoom?: number;
  livingArea?: number;
  plotSize?: number;
  value?: string;
}
// Living
const minWidthLiving = 61;
const minHeightLiving = 61;
const maxWidthLiving = 270;
const maxHeightLiving = 220;
const maxValueLiving = 400;

// plotSize

const minWidthLand = 100;
const minHeightLand = 100;
const maxWidthLand = 400;
const maxHeightLand = 400;

const maxValueLand = 1000;
export const HouseMultipleRoom = (props: HouseMultipleRoomProps) => {
  const {
    classImage,
    width,
    height,
    style,
    numberOfRoom,
    livingArea = 0,
    plotSize = 0,
    value = "",
  } = props;

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

  const handlePlotSizeLand = useCallback(
    (params: "width" | "height") => {
      if (params === "width") {
        const width = maxWidthLand * (plotSize / maxValueLand);
        if (width < minWidthLand) return minWidthLand;
        return width;
      }

      if (params === "height") {
        const height = maxHeightLand * (plotSize / maxValueLand);
        if (height < minHeightLand) return minHeightLand;
        return height;
      }
    },
    [plotSize],
  );
  const renderImage = useCallback(() => {
    switch (numberOfRoom) {
      case 1:
        return (
          <MyHouseIcon1
            className={`absolute z-50 ${classImage}`}
            width={handleSizeLand("width")}
            height={handleSizeLand("height")}
            style={style}
          />
        );
        break;
      case 2:
        return (
          <MyHouseIcon2
            className={`absolute z-50 ${classImage}`}
            width={handleSizeLand("width")}
            height={handleSizeLand("height")}
            style={style}
          />
        );
        break;
      case 3:
        return (
          <MyHouseIcon3
            className={`absolute z-50 ${classImage}`}
            width={handleSizeLand("width")}
            height={handleSizeLand("height")}
            style={style}
          />
        );
        break;
      case 4:
        return (
          <MyHouseIcon4
            className={`absolute z-50 ${classImage}`}
            width={handleSizeLand("width")}
            height={handleSizeLand("height")}
            style={style}
          />
        );
        break;
      case 5:
        return (
          <MyHouseIcon5
            className={`absolute z-50 ${classImage}`}
            width={handleSizeLand("width")}
            height={handleSizeLand("height")}
            style={style}
          />
        );
        break;
      case 6:
        return (
          <MyHouseIcon6
            className={`absolute z-50 ${classImage}`}
            width={handleSizeLand("width")}
            height={handleSizeLand("height")}
            style={style}
          />
        );
        break;
      case 7:
        return (
          <MyHouseIcon7
            className={`absolute z-50 ${classImage}`}
            width={handleSizeLand("width")}
            height={handleSizeLand("height")}
            style={style}
          />
        );
        break;
      case 8:
        return (
          <MyHouseIcon8
            className={`absolute z-50 ${classImage}`}
            width={handleSizeLand("width")}
            height={handleSizeLand("height")}
            style={style}
          />
        );
        break;
      case 9:
        return (
          <MyHouseIcon9
            className={`absolute z-50 ${classImage}`}
            width={handleSizeLand("width")}
            height={handleSizeLand("height")}
            style={style}
          />
        );
        break;
      case 10:
        return (
          <MyHouseIcon10
            className={`absolute z-50 ${classImage}`}
            width={handleSizeLand("width")}
            height={handleSizeLand("height")}
            style={style}
          />
        );
        break;
      default:
        return (
          <MyHouseIcon1
            className={`absolute z-50 ${classImage}`}
            width={handleSizeLand("width")}
            height={handleSizeLand("height")}
            style={style}
          />
        );
        break;
    }
  }, [numberOfRoom, livingArea]);

  return (
    <>
      <AppText
        text={value}
        className="px-4 text-center text-font-12 font-weight_300 text-black opacity-60"
      />
      <View className={`mt-3 h-[370px] items-center justify-center`}>
        {renderImage()}
        <LandIcon
          width={handlePlotSizeLand("width")}
          height={handlePlotSizeLand("height")}
        />
      </View>
    </>
  );
};
