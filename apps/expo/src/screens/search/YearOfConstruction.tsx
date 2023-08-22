/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback } from "react";
import {
  Image,
  Text,
  View,
  type ImageResizeMode,
  type ImageSourcePropType,
} from "react-native";
import { useAssets, type Asset } from "expo-asset";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { RangePicker, StepProgressButton } from "~/components/ui";
import { getCountScreen } from "~/utils";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../RootStackParams";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "YearOfConstruction">;
interface ImageBlurProps {
  classImage?: string | undefined;
  source?: Asset | undefined;
  blur?: boolean | undefined;
  resizeMode?: ImageResizeMode | undefined;
}
const minValueYOC = 1950;
const maxValueYOC = new Date()?.getFullYear();

const YearOfConstruction = ({ navigation }: Props) => {
  // image
  const [House] = useAssets([
    require("../../../assets/ImageHouse/House.png"),
    require("../../../assets/ImageHouse/House1.png"),
    require("../../../assets/ImageHouse/House2.png"),
    require("../../../assets/ImageHouse/House3.png"),
    require("../../../assets/ImageHouse/House4.png"),
  ]);
  // zustand
  const yearOfConstructionStart_zutand = useSearchWizardStore(
    (state) => state?.yearOfConstructionStart,
  );
  const yearOfConstructionEnd_zutand = useSearchWizardStore(
    (state) => state?.yearOfConstructionEnd,
  );
  const setYearOfConstructionStart_zutand = useSearchWizardStore(
    (state) => state?.setYearOfConstructionStart,
  );
  const setYearOfConstructionEnd_zutand = useSearchWizardStore(
    (state) => state?.setYearOfConstructionEnd,
  );
  const ImgaeBlur = (props: ImageBlurProps) => {
    const { classImage, source, blur, resizeMode = "contain" } = props;

    return (
      <View className="flex-1">
        <Image
          className={classImage}
          resizeMode={resizeMode}
          source={source as ImageSourcePropType}
          blurRadius={blur ? 7 : undefined}
        />
      </View>
    );
  };
  // functions
  const handleTouchEnd = useCallback((lowValue: number, hightValue: number) => {
    setYearOfConstructionEnd_zutand(hightValue);

    if (lowValue < 10) {
      setYearOfConstructionStart_zutand(5); // minimum 5km for now
      return;
    }
    setYearOfConstructionStart_zutand(lowValue);
  }, []);

  const handlePressNext = () => {
    navigation.navigate("PriceRange");
  };

  console.log(
    { yearOfConstructionEnd_zutand },
    { yearOfConstructionStart_zutand },
  );
  const getArrayYear = (max: number, number: number) => {
    const values = [];
    for (let index = 0; index <= number / 2; index++) {
      values.push(
        `${index === number / 2 ? "<" : ""}${max - number * index}${
          index === 0 ? "+" : ""
        }`,
      );
    }
    return values.reverse();
  };
  // main return
  if (!House) return null;
  return (
    <SearchLayout>
      <View>
        <View className="mb-4 px-8">
          <Text className="text-font-18 font-weight_800 text-black_1">
            Wir finden für dich
          </Text>

          <View className="mt-5">
            <Text className="mb-1 text-font-14 font-weight_800 text-black_1">
              Baujahr
            </Text>
            <Text className="text-font-12 font-weight_300 text-black_1 opacity-60">
              Welches Baujahr soll deine Immobilie haben?
            </Text>
          </View>
        </View>

        <View className="mb-8 px-3">
          <RangePicker
            min={maxValueYOC - 50}
            max={maxValueYOC}
            rangeDisabled={false}
            lowProp={yearOfConstructionStart_zutand}
            highProp={yearOfConstructionEnd_zutand}
            onSliderTouchEnd={handleTouchEnd}
            showBottomMetric
            bottomMetricProps={{
              stepNum: 10,
              values: getArrayYear(maxValueYOC, 10),
            }}
            // handleValueChange={handleValueChange} // avoid this, cause poor performace re-render
          />
        </View>

        {/* <Text className="mb-8 px-4 text-right text-font-12 font-weight_300 text-black opacity-60">
          {yearOfConstructionStart_zutand === minValueYOC
            ? `<${yearOfConstructionStart_zutand}`
            : yearOfConstructionStart_zutand}{" "}
          to{" "}
          {yearOfConstructionEnd_zutand === maxValueYOC
            ? `+${yearOfConstructionEnd_zutand}`
            : yearOfConstructionEnd_zutand}
        </Text> */}

        <View className="mx-4  mt-10 flex-row items-end justify-between">
          <ImgaeBlur
            classImage="h-[38px] w-[52px]"
            resizeMode="contain"
            source={House[0]}
            blur={yearOfConstructionStart_zutand >= 1985}
          />
          <ImgaeBlur
            classImage="h-[46px] w-[52px]"
            resizeMode="contain"
            source={House[1]}
            blur={yearOfConstructionStart_zutand >= 1985}
          />
          <ImgaeBlur
            classImage="h-[56px] w-[64px]"
            resizeMode="contain"
            source={House[2]}
            blur={yearOfConstructionStart_zutand >= 2003}
          />
          <ImgaeBlur
            classImage="h-[58px] w-[66px]"
            resizeMode="contain"
            source={House[3]}
            // blur={}
          />
          <ImgaeBlur
            classImage="h-[41px] w-[74px]"
            resizeMode="center"
            source={House[4]}
            blur={yearOfConstructionEnd_zutand <= 2003}
          />
        </View>
      </View>

      <StepProgressButton
        title="Continue"
        progress={getCountScreen("YearOfConstruction")}
        onPress={handlePressNext}
        variant="turquoise"
      />
    </SearchLayout>
  );
};
export default YearOfConstruction;
