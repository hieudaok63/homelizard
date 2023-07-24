import React, { type Dispatch, type SetStateAction } from "react";
import { View } from "react-native";

import ArrowDownIcon from "@assets/icons/ArrowDownIcon.svg";
import ArrowUpIcon from "@assets/icons/ArrowUpIcon.svg";
import DefaultYellowIcon from "@assets/icons/DefaultYellowIcon.svg";

import { ButtonProfile } from "~/components/Profile";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { ButtonActionMain } from "~/components/ui";

interface ContactDetailSection {
  isShowModal: boolean;
  setShowListOption: Dispatch<SetStateAction<boolean>>;
  title: string;
  description?: string;
}

export const ContactDetailSection = ({
  isShowModal,
  title,
  setShowListOption,
}: ContactDetailSection) => {
  const navigation = useAppNavigation();

  return (
    <View className="mt-8 overflow-hidden rounded-[40px]">
      <ButtonActionMain
        onPress={() => setShowListOption((pre) => !pre)}
        title={title}
        IconLeftProps={<DefaultYellowIcon />}
        variant="yellow"
        progress={41}
        isProgressbar
        isFill
        IconRightProps={
          isShowModal ? (
            <ArrowUpIcon color="white" width={24} height={24} />
          ) : (
            <ArrowDownIcon fill="#000000" />
          )
        }
        onPressIconRight={() => setShowListOption((pre) => !pre)}
        styleBoxShadowBtn={true}
        classButton="rounded-none mb-3"
        activeOpacity={0.8}
      />

      <View className="mt-[-13px] px-[26px]">
        <View className="flex w-full items-center justify-center">
          {isShowModal && (
            <>
              <ButtonProfile
                onPress={() => navigation.navigate("BasicInfoSection")}
                variant="yellow"
                progress={20}
                title="Basisdaten"
                description="Titel, Namen, Beruf, Geburtsdaten"
              />
              <ButtonProfile
                onPress={() => navigation.navigate("MobilePhoneSection")}
                variant="yellow"
                progress={20}
                title="Mobile phone"
                description="Telefonische Erreichbarkeit"
              />
              <ButtonProfile
                onPress={() => navigation.navigate("EmailAndWebSection")}
                variant="yellow"
                progress={20}
                description="Email- und Web-Adressen"
                title="Email & web"
              />
              <ButtonProfile
                onPress={() => navigation.navigate("AddressSection")}
                variant="yellow"
                progress={20}
                title="Adressen"
                description="Wo und wie arbeiten Sie?"
                isLastItem
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
};
