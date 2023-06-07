/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useMemo } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import InfoSCircleIcon from "@assets/icons/InfoSCircleIcon.svg";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button, StepProgress } from "~/components/ui";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../routes";
import { carouselItems, type IItem } from "./ObjectStyle";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "ObjectStyleResult">;

const ContemporaryImage = require("@assets/objectTypePng/Contemporary.png");

const ObjectStyleResult = ({ navigation }: Props) => {
  // zustand
  const objectStyles_zutand = useSearchWizardStore(
    (state) => state?.objectStyles,
  );
  const actualItems = useMemo(
    () =>
      carouselItems?.filter((el) => objectStyles_zutand?.includes(el?.title)),
    [],
  );

  // functions
  const renderItem = useCallback(({ item }: { item: IItem }) => {
    return (
      <View className="mb-3 w-72 overflow-hidden rounded-3xl p-0">
        <View className="relative h-24 w-full items-center justify-center overflow-hidden">
          <Image source={item?.imgSrc} alt={item?.title} />
          <TouchableOpacity className="absolute flex-row items-center justify-between rounded-full bg-white px-6 py-2">
            <View className="mr-1">
              <Text className="text-black_xtra font-weight_700 text-font-15 mb-1">
                {item?.title}
              </Text>
              <Text className="text-placeholder opacity-85 font-weight_400 text-font-12">{`${item?.desc?.substring(
                0,
                30,
              )}...`}</Text>
            </View>

            <InfoSCircleIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  const handlePressNext = () => {
    navigation?.navigate("Results");
  };

  const handlePressSelectMore = () => {
    navigation?.goBack();
  };

  // main return
  return (
    <SearchLayout>
      {/* <KeyboardAwareScrollView> */}
      <View className="mb-4 px-8">
        <Text className="font-weight_800 text-font-18 text-black_1">
          Wir finden für dich
        </Text>

        <View className="mt-5">
          <Text className="text-black_1 text-font-14 font-weight_800 mb-1">
            Welchen Stil soll das Objekt haben?
          </Text>
          <Text className="text-black_1 text-font-12 font-weight_300 opacity-60">
            Wähle aus der Liste
          </Text>
        </View>
      </View>

      <View className="mb-12 h-80 w-full items-center justify-center">
        <FlatList
          data={actualItems}
          keyExtractor={(item) => item?.title}
          renderItem={renderItem}
        />
      </View>

      <TouchableOpacity
        className="mb-6 items-center justify-center"
        onPress={handlePressSelectMore}
      >
        <View className="h-24 w-24 items-center justify-center overflow-hidden rounded-full">
          <Image source={ContemporaryImage} alt="ContemporaryImage" />
        </View>
        <Text className="text-black_xtra opacity-85 font-weight_400 text-font-14 w-20 text-center">
          weiteren Stil auswählen
        </Text>
      </TouchableOpacity>

      <View className="px-12">
        <StepProgress width="w-10/12" />

        <Button
          title="Continue"
          onPress={handlePressNext}
          className="rounded-3xl"
          disabled={!objectStyles_zutand?.length}
        />
      </View>
      {/* </KeyboardAwareScrollView> */}
    </SearchLayout>
  );
};

export default ObjectStyleResult;
