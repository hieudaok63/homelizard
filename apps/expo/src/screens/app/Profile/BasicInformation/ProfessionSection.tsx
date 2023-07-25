import React, { type Dispatch, type SetStateAction } from "react";
import { View } from "react-native";

import { cn } from "@homelizard/tailwind-config/utils";

import ArrowDownIcon from "@assets/icons/ArrowDownIcon.svg";
import ArrowUpIcon from "@assets/icons/ArrowUpIcon.svg";
import DefaultYellowIcon from "@assets/icons/DefaultYellowIcon.svg";

import { ButtonProfile } from "~/components/Profile";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { ButtonActionMain } from "~/components/ui";

interface ProfessionSectionProps {
  isShowModal: boolean;
  setShowListOption: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
}

export const ProfessionSection = ({
  isShowModal,
  title,
  description,
  setShowListOption,
}: ProfessionSectionProps) => {
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
        progress={14}
        isProgressbar
        IconRightProps={
          isShowModal ? (
            <ArrowUpIcon color="white" width={24} height={24} />
          ) : (
            <ArrowDownIcon fill="#000000" />
          )
        }
        styleBoxShadowBtn={true}
        classButton={cn(
          "rounded-none mb-3",
          isShowModal ? "rounded-t-[40px]" : "rounded-full",
        )}
        description={description}
        activeOpacity={0.8}
      />
      <View className="mt-[-13px] px-[26px]">
        <View className="flex w-full items-center justify-center">
          {isShowModal && (
            <>
              <ButtonProfile
                onPress={() => navigateScreen("PlaceOfWorkSection")}
                variant="yellow"
                progress={20}
                title="Arbeitsplatz"
                description="Wo und wie arbeiten Sie?"
              />
              <ButtonProfile
                onPress={() => navigateScreen("CurriculumVitaeSection")}
                variant="yellow"
                progress={20}
                title="Curriculum vitae"
                description="Ausbildung, Qualifikation"
                isLastItem
              />
            </>
          )}
        </View>
      </View>
    </>
  );
};
