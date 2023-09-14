import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import {
  type ObjectType as IObjectType,
  type ObjectSelectType,
} from "@homelizard/schema";

import { HausIcon, MFHIcon, WohnungIcon } from "@assets/icons";

import { getNameObjectType } from "~/utils/getNameObjectType";
import { generateBoxShadowStyle } from "~/utils/helpers";
import {
  BottomSheet,
  Button,
  CustomSwitch,
  StepProgressButton,
} from "~/components/ui";
import { getCountScreen } from "~/utils";
import { useSearchWizardStore } from "~/zustand/store";
import { type RootStackParams } from "../RootStackParams";
import { SearchLayout } from "./_layout";

type Props = NativeStackScreenProps<RootStackParams, "ObjectType">;
const houseOptions: IObjectType[] = [
  "apartment_normal",
  "apartment_maisonette",
  "apartment_attic",
  "apartment_penthouse",
  "apartment_terraced",
  "apartment_studio",
];
const apartmentOptions: IObjectType[] = [
  "house_detached",
  "house_semi_detached",
  "house_row_corner",
  "house_row_middle",
  "house_farm",
];
export const styleBoxShadow = generateBoxShadowStyle("shadowObjectType");

const ObjectType = ({ navigation }: Props) => {
  const { t } = useTranslation("search");

  // zustand
  const setObjectTypes = useSearchWizardStore((state) => state?.setObjectTypes);
  const setPurchaseType = useSearchWizardStore(
    (state) => state?.setPurchaseType,
  );

  const objectTypes = useSearchWizardStore((state) => state?.objectTypes);
  const purchaseType = useSearchWizardStore((state) => state?.purchaseType);

  // local states
  const [showList, setShowList] = useState<ObjectSelectType>(null);
  // functions
  const hideBottomSheet = () => {
    setShowList(null);
  };

  const handlePressNext = () => {
    navigation?.navigate("Location");
  };

  const toggleObjectType = (objectType: IObjectType) => {
    const index = objectTypes.indexOf(objectType);
    if (index > -1) {
      setObjectTypes([
        ...objectTypes.slice(0, index),
        ...objectTypes.slice(index + 1),
      ]);
    } else {
      setObjectTypes([...objectTypes, objectType]);
    }
  };

  const isSelected = (objectType: IObjectType) => {
    return objectTypes.includes(objectType);
  };

  const selectedAtLeastOneOf = (options: IObjectType[]) => {
    return options.some((value) => isSelected(value));
  };

  // main return
  return (
    <SearchLayout>
      <View className="mb-40 px-8">
        <Text className="text-font-18 font-weight_800 text-black_1">
          {t("search.label.weSearch")}
        </Text>

        <View className="mt-5">
          <Text className="mb-1 text-font-14 font-weight_800 text-black_1">
            {t("search.label.objectType")}
          </Text>
          <Text className="text-font-12 font-weight_300 text-black_1 opacity-60">
            {t("search.text.selectObjectType")}
          </Text>
        </View>
        <View className="mt-6 w-full items-center">
          <CustomSwitch
            onValueChange={(isEnabled) =>
              setPurchaseType(isEnabled ? "buy" : "rent")
            }
            defaultValue={purchaseType === "buy"}
            onLabel={t("search.switch.buy")}
            offLabel={t("search.switch.rent")}
          />
        </View>
      </View>

      <View className="mb-64 flex flex-row flex-wrap items-center justify-between px-4">
        <TouchableOpacity
          className={`h-[150px] w-[30%] items-center justify-center rounded-3xl bg-[#F4F4F4] pt-4`}
          onPress={() => {
            setShowList("houseList");
          }}
          style={selectedAtLeastOneOf(houseOptions) && styleBoxShadow}
        >
          <HausIcon />
          <Text className="mt-3 text-font-14 font-weight_800 text-black_1">
            {t("search.button.house")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="h-[150px] w-[30%] items-center justify-center rounded-3xl bg-[#F4F4F4] pt-4"
          onPress={() => {
            setShowList("MFH");
            toggleObjectType("Multi-Family house");
          }}
          style={objectTypes.includes("Multi-Family house") && styleBoxShadow}
        >
          <MFHIcon />
          <Text className="mt-3 flex-1 text-center text-font-14 font-weight_800 text-black_1">
            {t("search.button.multiHouse")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`h-[150px] w-[30%] items-center justify-center rounded-3xl bg-[#F4F4F4] pt-4`}
          onPress={() => {
            setShowList("apartementList");
          }}
          style={selectedAtLeastOneOf(apartmentOptions) && styleBoxShadow}
        >
          <WohnungIcon />
          <Text className="mt-3 text-center text-font-14 font-weight_800 text-black_1">
            {t("search.button.apartement")}
          </Text>
        </TouchableOpacity>
      </View>
      <StepProgressButton
        progress={(objectTypes.length && getCountScreen("ObjectType")) || 0}
        title={t("general.button.continue")}
        onPress={handlePressNext}
        disabled={!objectTypes.length}
        variant="turquoise"
      />
      {/* bottom menu */}
      <BottomSheet
        show={showList !== null && showList !== "MFH"}
        height={600}
        onClose={hideBottomSheet}
        closeOnBackBtnAndroid
      >
        <View className="flex-1">
          <View className="border-b border-color_gray">
            <Text className="py-4 text-center text-font-24 font-weight_400 text-grey opacity-80">
              {showList === "apartementList"
                ? t("search.list.apartementTypes")
                : t("search.list.houseTypes")}
            </Text>
          </View>
          {(showList === "apartementList"
            ? apartmentOptions
            : houseOptions
          )?.map((item: IObjectType) => (
            <TouchableOpacity
              key={item}
              className={`flex-row items-center justify-center border-b border-color_gray py-4 ${
                isSelected(item) && "bg-[#0080FF]"
              }`}
              onPress={() => {
                toggleObjectType(item);
              }}
            >
              <Text
                className={`text-font-24 font-weight_400 ${
                  isSelected(item) ? "text-white" : "text-blue_1"
                }`}
              >
                {getNameObjectType(item)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          className="mb-9 h-12 w-[143px] self-center rounded-[28px] bg-[#0080FF]"
          title={t("general.button.OK")}
          onPress={() => {
            hideBottomSheet();
          }}
        />
      </BottomSheet>
    </SearchLayout>
  );
};
export default ObjectType;
