import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import { type ObjectType as IObjectType } from "@homelizard/schema";

import BuildingIcon from "@assets/icons/BuildingIcon.svg";
import CheckIcon from "@assets/icons/CheckIcon.svg";
import HouseIcon from "@assets/icons/HouseIcon.svg";

import { generateBoxShadowStyle } from "~/utils/helpers";
import { BottomSheet, CustomSwitch, StepProgressButton } from "~/components/ui";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../RootStackParams";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "ObjectType">;

const realEstateOptions: IObjectType[] = [
  "Apartment",
  "Country house",
  "Dormitory on campus",
  "House with garden",
  "Mansion",
  "Shared apartment",
  "Town house",
  "Villa",
];

export const styleBoxShadow = generateBoxShadowStyle("shadowObjectType");

const ObjectType = ({ navigation }: Props) => {
  // zustand
  const setObjectType = useSearchWizardStore((state) => state?.setObjectType);
  const setPurchaseType = useSearchWizardStore(
    (state) => state?.setPurchaseType,
  );
  const objectType = useSearchWizardStore((state) => state?.objectType);
  const purchaseType = useSearchWizardStore((state) => state?.purchaseType);

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
        <Text className="text-font-18 font-weight_800 text-black_1">
          Wir finden für dich
        </Text>

        <View className="mt-5">
          <Text className="mb-1 text-font-14 font-weight_800 text-black_1">
            Objekttyp
          </Text>
          <Text className="text-font-12 font-weight_300 text-black_1 opacity-60">
            Wähle die Art der gesuchten Immobilie
          </Text>
        </View>
        <View className="mt-6 w-full items-center">
          <CustomSwitch
            onValueChange={(isEnabled) =>
              setPurchaseType(isEnabled ? "buy" : "rent")
            }
            defaultValue={purchaseType === "buy"}
            onLabel="Kaufen"
            offLabel="Mieten"
          />
        </View>
      </View>

      <View className="mb-64 flex flex-row flex-wrap items-center justify-between px-4">
        <TouchableOpacity
          className={`items-center rounded-3xl bg-grey_3 px-6 py-7 ${
            objectType === "House with garden" && "border-4 border-color_green"
          }`}
          onPress={() => {
            setObjectType("House with garden");
          }}
          style={styleBoxShadow}
        >
          <HouseIcon />
          <Text className="mt-3 text-font-14 font-weight_800 text-black_1">
            Haus
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`items-center rounded-3xl bg-grey_3 px-6 py-7 ${
            objectType === "Apartment" && "border-4 border-color_green"
          }`}
          onPress={() => {
            setObjectType("Apartment");
          }}
          style={styleBoxShadow}
        >
          <BuildingIcon />
          <Text className="mt-3 text-font-14 font-weight_800 text-black_1">
            Wohnung
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`items-center rounded-3xl bg-grey_3 px-6 py-14 ${
            objectType &&
            objectType !== "House with garden" &&
            objectType !== "Apartment" &&
            "border-4 border-color_green"
          }`}
          onPress={openBottomSheet}
          style={styleBoxShadow}
        >
          <Text className="text-font-14 font-weight_800 text-black_1">
            Mehr
          </Text>
          <Text className="text-font-14 font-weight_800 text-black_1">
            Optionen
          </Text>
        </TouchableOpacity>
      </View>
      <StepProgressButton
        progress={(objectType && 20) || 0}
        title="Continue"
        onPress={handlePressNext}
        disabled={!objectType}
        variant="turquoise"
      />
      {/* bottom menu */}
      <BottomSheet
        show={showBottomSheet}
        height={600}
        onOuterClick={hideBottomSheet}
        setShow={setShowBottomSheet}
        closeOnBackBtnAndroid
      >
        <View>
          <View className="border-b border-color_gray">
            <Text className="py-4 text-center text-font-24 font-weight_400 text-grey opacity-80">
              Residence type
            </Text>
          </View>
          {realEstateOptions?.map((item) => (
            <TouchableOpacity
              key={item}
              className="flex-row items-center justify-center border-b border-color_gray py-4"
              onPress={() => {
                hideBottomSheet();
                setObjectType(item);
                setTimeout(() => {
                  navigation?.navigate("Location");
                }, 300);
              }}
            >
              <Text className="text-font-24 font-weight_400 text-blue_1">
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
