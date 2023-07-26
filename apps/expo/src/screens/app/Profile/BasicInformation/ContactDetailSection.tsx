import React, { type Dispatch, type SetStateAction } from "react";
import { View } from "react-native";

import ArrowDownIcon from "@assets/icons/ArrowDownIcon.svg";
import ArrowUpIcon from "@assets/icons/ArrowUpIcon.svg";

import { ButtonProfile } from "~/components/Profile";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { ButtonActionMain, SpeechBubbleIcon } from "~/components/ui";
import { progressSlice } from "~/zustand/store";

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

  const {
    addressProgress,
    basicInformationProgress,
    contactDetailProgress,
    emailAndWebProgress,
    mobilePhoneProgress,
  } = progressSlice((state) => state);

  return (
    <View className="mt-8 overflow-hidden rounded-[40px]">
      <ButtonActionMain
        onPress={() => setShowListOption((pre) => !pre)}
        title={title}
        IconLeftProps={<SpeechBubbleIcon color="yellow" />}
        variant="yellow"
        progress={contactDetailProgress}
        isProgressbar
        isFill
        IconRightProps={
          isShowModal ? (
            <ArrowUpIcon color="white" width={24} height={24} />
          ) : (
            <ArrowDownIcon fill="#000000" />
          )
        }
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
                progress={basicInformationProgress}
                title="Basisdaten"
                description="Titel, Namen, Beruf, Geburtsdaten"
              />
              <ButtonProfile
                onPress={() => navigation.navigate("MobilePhoneSection")}
                variant="yellow"
                progress={mobilePhoneProgress}
                title="Mobile phone"
                description="Telefonische Erreichbarkeit"
              />
              <ButtonProfile
                onPress={() => navigation.navigate("EmailAndWebSection")}
                variant="yellow"
                progress={emailAndWebProgress}
                description="Email- und Web-Adressen"
                title="Email & web"
              />
              <ButtonProfile
                onPress={() => navigation.navigate("AddressSection")}
                variant="yellow"
                progress={addressProgress}
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
