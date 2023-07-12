import React, { type Dispatch, type SetStateAction } from "react";
import { View } from "react-native";

import { cn } from "@homelizard/tailwind-config/utils";

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

  const navigateScreen = (screen: string) => {
    return navigation.navigate(screen);
  };

  return (
    <>
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
        classButton={cn(
          "rounded-none mb-3",
          isShowModal ? "rounded-t-[40px]" : "rounded-full",
        )}
        activeOpacity={0.8}
      />

      <View className="mt-[-13px] px-[26px]">
        <View className="flex w-full items-center justify-center">
          {isShowModal && (
            <>
              <ButtonProfile
                onPress={() => navigateScreen("BasicInfoSection")}
                onPressIconRight={() => navigateScreen("BasicInfoSection")}
                variant="yellow"
                progress={20}
                title="Basisdaten"
                description="Titel, Namen, Beruf, Geburtsdaten"
              />
              <ButtonProfile
                onPress={() => navigateScreen("MobilePhoneSection")}
                onPressIconRight={() => navigateScreen("MobilePhoneSection")}
                variant="yellow"
                progress={20}
                title="Mobile phone"
                description="Telefonische Erreichbarkeit"
              />
              <ButtonProfile
                onPress={() => navigateScreen("EmailAndWebSection")}
                onPressIconRight={() => navigateScreen("EmailAndWebSection")}
                variant="yellow"
                progress={20}
                description="Email- und Web-Adressen"
                title="Email & web"
              />
              <ButtonProfile
                onPress={() => navigateScreen("AddressSection")}
                onPressIconRight={() => navigateScreen("AddressSection")}
                variant="yellow"
                progress={20}
                title="Adressen"
                description="Wo und wie arbeiten Sie?"
                lastItemButton
              />
            </>
          )}
        </View>
      </View>
    </>
  );
};
