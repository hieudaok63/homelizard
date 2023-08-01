/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useMemo } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  type ListRenderItemInfo,
} from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import InfoSCircleIcon from "@assets/icons/InfoSCircleIcon.svg";

import { api, type RouterOutputs } from "~/utils/api";
import { genImageUrl } from "~/utils/imageUrl";
import { StepProgressButton } from "~/components/ui";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../RootStackParams";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "ObjectStyleResult">;
type IObjectStyleItem = RouterOutputs["objectStyle"]["all"][number];

const ContemporaryImage = require("@assets/objectStyleImage/Contemporary.png");

const ObjectStyleResult = ({ navigation }: Props) => {
  // zustand
  const objectStyles_zutand = useSearchWizardStore(
    (state) => state?.objectStyles,
  );

  const setSearchCompleted = useSearchWizardStore(
    (state) => state?.setIsCompleted,
  );
  const { data } = api.objectStyle.all.useQuery();

  const actualItems = useMemo(
    () => data?.filter((el) => objectStyles_zutand?.includes(el.id)),
    [],
  );

  // functions
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IObjectStyleItem>) => {
      return (
        <View className="mb-3 w-72 overflow-hidden rounded-3xl p-0">
          <View className="relative h-24 w-full items-center justify-center overflow-hidden">
            <Image
              source={genImageUrl(item.imageUrl)}
              alt={item.title}
              className="h-full w-full"
            />
            <TouchableOpacity className="absolute w-11/12 flex-row items-center justify-between rounded-full bg-white px-6 py-2">
              <View className="mr-1 flex-1">
                <Text
                  className="mb-1 text-font-15 font-weight_700 text-black_xtra"
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text
                  numberOfLines={1}
                  className="opacity-85 text-font-12 font-weight_400 text-placeholder"
                >{`${item.description}...`}</Text>
              </View>

              <InfoSCircleIcon />
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [],
  );

  const handlePressNext = () => {
    setSearchCompleted(true);
    navigation?.navigate("Results");
  };

  const handlePressSelectMore = () => {
    navigation?.navigate("ObjectStyle");
  };

  // main return
  return (
    <SearchLayout>
      <View className="mb-4 px-8">
        <Text className="text-font-18 font-weight_800 text-black_1">
          Wir finden für dich
        </Text>

        <View className="mt-5">
          <Text className="mb-1 text-font-14 font-weight_800 text-black_1">
            Welchen Stil soll das Objekt haben?
          </Text>
          <Text className="text-font-12 font-weight_300 text-black_1 opacity-60">
            Wähle aus der Liste
          </Text>
        </View>
      </View>

      <View className="mb-12 h-80 w-full items-center justify-center">
        <FlatList
          data={actualItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <TouchableOpacity
        className="mb-6 items-center justify-center"
        onPress={handlePressSelectMore}
      >
        <View className="h-24 w-24 items-center justify-center overflow-hidden rounded-full">
          <Image source={ContemporaryImage} alt="ContemporaryImage" />
        </View>
        <Text className="opacity-85 w-20 text-center text-font-14 font-weight_400 text-black_xtra">
          weiteren Stil auswählen
        </Text>
      </TouchableOpacity>

      <StepProgressButton
        title="Continue"
        progress={99}
        onPress={handlePressNext}
        disabled={!objectStyles_zutand?.length}
        variant="turquoise"
      />
    </SearchLayout>
  );
};

export default ObjectStyleResult;
