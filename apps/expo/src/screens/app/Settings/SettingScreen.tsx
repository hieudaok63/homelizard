import React, { useTransition } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

import {
  ArrowLeftIcon,
  InfoIcon,
  PeopleIcon,
  RemoveIcon,
  SettingIcon,
} from "@assets/icons";

import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { ButtonActionMain } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";
import GradientPatternBackground from "~/components/ui/GradientPatternBackground";

export const SettingScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useAppNavigation();
  return (
    <View className={`h-full bg-white`} style={{ paddingTop: top }}>
      <View className="px-6">
        <AppText
          className="text-[rgba(0, 0, 0, 0.87)] text-4xl"
          text={t("settings:setting")}
        />
        <AppText
          className="mb-6 text-sm text-[#262636]"
          text={t("settings:settingAndHelp")}
        />
      </View>
      <View className="flex-1 overflow-hidden rounded-tr-[40px]">
        <GradientPatternBackground variant="yellow">
          <View className="flex-row py-6">
            <TouchableOpacity
              className="pl-6"
              onPress={() => navigation.goBack()}
            >
              <ArrowLeftIcon />
            </TouchableOpacity>
            <AppText text={t("settings:return")} className="pl-5 text-2xl" />
          </View>

          <View className="px-6">
            <ButtonActionMain
              title={t("settings:generalSettings")}
              description={t("settings:einstellungen")}
              onPress={() => {}}
              IconLeftProps={<SettingIcon />}
              isButton
              noSpeechBubbleIcon
              IconRightProps={""}
            />
            <ButtonActionMain
              title={t("settings:Support")}
              description={t("settings:desSupport")}
              onPress={() => {}}
              IconLeftProps={<InfoIcon />}
              isButton
              IconRightProps={""}
              variant="yellow"
              noSpeechBubbleIcon
              classButton="mt-2"
            />
            <ButtonActionMain
              title={t("settings:delete")}
              description={t("settings:deleteAccount")}
              onPress={() => navigation.navigate("DeleteAccount")}
              IconLeftProps={<RemoveIcon />}
              isButton
              IconRightProps={""}
              variant="yellow"
              noSpeechBubbleIcon
              classButton="mt-2"
            />
          </View>
        </GradientPatternBackground>
      </View>
    </View>
  );
};
