import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "i18next";

import {
  BarChartIcon,
  CloseIcon,
  IconCloseBorder,
  SwitchOff,
  SwitchOn,
  WarnIcon,
} from "@assets/icons";

import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { Button } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";
import { useBackendUser } from "~/hooks/useBackendUser";

export const DeleteAccount = () => {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const [isContact, setIsContact] = useState(true);
  const [isVerify, setIsVerify] = useState(false);
  const user = useBackendUser();
  console.log({ user });

  const renderHeader = () => {
    return (
      <View className="flex-row items-center justify-center border-b-2 border-[#0000001F]">
        <TouchableOpacity
          className="absolute bottom-6 left-8"
          onPress={() => navigation.goBack()}
        >
          <IconCloseBorder />
        </TouchableOpacity>
        <AppText
          text={t("settings:delete")}
          className="pb-6 text-2xl text-[#828282D9]"
        />
      </View>
    );
  };
  return (
    <View className={`h-full bg-white`} style={{ paddingTop: top }}>
      {renderHeader()}
      <View className="px-14 pt-4">
        <WarnIcon />
        <AppText
          classText="text-[15px] font-nunito-bold"
          text={
            isVerify
              ? t("settings:verifyDeleteAccount")
              : t("settings:deleteAccount")
          }
        />

        <AppText
          className="mt-1 text-xs"
          text={
            isVerify
              ? t("settings:desVerifyDeleteAccount")
              : t("settings:desDeleteAccount")
          }
        />

        {isVerify ? (
          <>
            <AppText
              text={t("settings:email")}
              className="pt-24 text-xs text-[#828282]"
            />
            <AppText
              text={user?.email || ""}
              className="text-base text-[#000000DE]"
            />
          </>
        ) : (
          <>
            <AppText text={t("settings:contact")} className="pt-24 text-base" />
            <View className="flex-row justify-between">
              <AppText
                className="w-[80%] pt-1 text-xs text-[#828282D9]"
                text={t("settings:desContact")}
              />
              <TouchableOpacity onPress={() => setIsContact((pre) => !pre)}>
                {isContact ? <SwitchOn /> : <SwitchOff />}
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <Button
        title={isVerify ? t("settings:confirm") : t("settings:continue")}
        onPress={() => setIsVerify((pre) => !pre)}
        className="absolute left-0 right-0 mx-14 rounded-[25px]"
        style={{ bottom: bottom + 16 }}
      />
    </View>
  );
};
