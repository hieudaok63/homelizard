import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BuildingIcon from "@assets/icons/BuildingIcon.svg";
import CheckIcon from "@assets/icons/CheckIcon.svg";
import HouseIcon from "@assets/icons/HouseIcon.svg";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { generateBoxShadowStyle } from "~/utils/helpers";
import { BottomSheet, Button } from "~/components/ui";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../routes";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "ObjectType">;

const realEstateOptions: Array<string> = [
  "Apartment",
  "Country house",
  "Dormitory on campus",
  "House with garden",
  "Mansion",
  "Shared apartment",
  "Town house",
  "Villa",
];

const shadowProps = {
  xOffset: 3,
  yOffset: 2,
  shadowColorIos: "#000000",
  shadowOpacity: 0.16,
  shadowRadius: 5,
  elevation: 3,
  shadowColorAndroid: "#000000",
};

const ObjectType = ({ navigation }: Props) => {
  // zustand
  const setObjectType = useSearchWizardStore((state) => state?.setObjectType);
  const objectType = useSearchWizardStore((state) => state?.objectType);

  // local states
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  // functions
  const openBottomSheet = () => {
    setShowBottomSheet(true);
  };

  const hideBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const handlePressNext = () => {
    navigation?.navigate("Location");
  };

  // main return
  return (
    <SearchLayout>
      <View className="mb-40 px-8">
        <Text className="font-weight_800 text-font-18 text-black_1">
          Wir finden für dich
        </Text>

        <View className="mt-5">
          <Text className="text-black_1 text-font-14 font-weight_800 mb-1">
            Objekttyp
          </Text>
          <Text className="text-black_1 text-font-12 font-weight_300 opacity-60">
            Wähle die Art der gesuchten Immobilie
          </Text>
        </View>
      </View>

      <View className="mb-64 flex flex-row flex-wrap items-center justify-between px-4">
        <TouchableOpacity
          className={`bg-grey_3 items-center rounded-3xl px-6 py-7 ${
            objectType === "House with garden" && "border-color_green border-4"
          }`}
          onPress={() => {
            setObjectType("House with garden");
          }}
          style={{
            ...generateBoxShadowStyle(shadowProps),
          }}
        >
          <HouseIcon />
          <Text className="text-font-14 text-black_1 font-weight_800 mt-3">
            Haus
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-grey_3 items-center rounded-3xl px-6 py-7 ${
            objectType === "Apartment" && "border-color_green border-4"
          }`}
          onPress={() => {
            setObjectType("Apartment");
          }}
          style={{
            ...generateBoxShadowStyle(shadowProps),
          }}
        >
          <BuildingIcon />
          <Text className="text-font-14 text-black_1 font-weight_800 mt-3">
            Wohnung
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-grey_3 items-center rounded-3xl px-6 py-14 ${
            objectType !== "House with garden" &&
            objectType !== "Apartment" &&
            "border-color_green border-4"
          }`}
          onPress={openBottomSheet}
          style={{
            ...generateBoxShadowStyle(shadowProps),
          }}
        >
          <Text className="text-font-14 text-black_1 font-weight_800">
            Mehr
          </Text>
          <Text className="text-font-14 text-black_1 font-weight_800">
            {" "}
            Optionen
          </Text>
        </TouchableOpacity>
      </View>

      <View className="px-12">
        <View className="relative mx-6">
          <LinearGradient
            colors={["#F5F7F9", "#ECEEEF"]}
            className="h-3 rounded-t-full"
          />
          <LinearGradient
            colors={["#37E1EC", "#11BBB0"]}
            className="w-0/3 absolute h-3 rounded-tl-full"
          />
        </View>
        <Button
          title="Continue"
          onPress={handlePressNext}
          className="rounded-3xl"
          disabled={!objectType}
        />
      </View>

      {/* bottom menu */}
      <BottomSheet
        show={showBottomSheet}
        height={600}
        onOuterClick={hideBottomSheet}
        setShow={setShowBottomSheet}
      >
        <View>
          <View className="border-color_gray border-b">
            <Text className="text-grey text-font-24 font-weight_400 py-4 text-center opacity-80">
              Residence type
            </Text>
          </View>
          {realEstateOptions?.map((item) => (
            <TouchableOpacity
              key={item}
              className="border-color_gray flex-row items-center justify-center border-b py-4"
              onPress={() => {
                hideBottomSheet();
                setObjectType(item);
              }}
            >
              <Text className="text-blue text-font-24 font-weight_400">
                {item}
              </Text>
              {objectType === item && (
                <View className="ml-3">
                  <CheckIcon stroke="#37E1EC" fill="#37E1EC" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    </SearchLayout>
  );
};
export default ObjectType;
