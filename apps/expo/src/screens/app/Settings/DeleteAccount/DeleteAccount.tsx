import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { t } from "i18next";

import { IconCloseBorder, SwitchOff, SwitchOn, WarnIcon } from "@assets/icons";

import { api } from "~/utils/api";
import { useAppNavigation } from "~/components/navigation/useAppNavigation";
import { Button } from "~/components/ui";
import { AppText } from "~/components/ui/AppText";
import { useApplicationLoadingStore } from "~/zustand/store";

export const DeleteAccount = () => {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useAppNavigation();

  // local states
  const [isContact, setIsContact] = useState(true);
  const [isConfirm, setIsConfirm] = useState(false);

  // zustand
  const setLoadingApp = useApplicationLoadingStore((slice) => slice.setLoading);

  // clerk data
  const { signOut } = useAuth();
  const { user } = useUser();
  const email = user?.emailAddresses?.[0]?.toString();

  // TRPC
  const deleteAccountMutation = api.user.deleteAccount.useMutation({
    async onSuccess() {
      await signOut();
      setLoadingApp(false);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Account deleted successfully!",
      });
    },
    onError(error) {
      setLoadingApp(false);
      Toast?.show({
        type: "error",
        text1: "Error!",
        text2: error?.message,
      });
    },
  });

  // functions
  const handlePressContinue = () => {
    setIsConfirm(true);
  };

  const handleConfirmDeleteAccount = async () => {
    setLoadingApp(true);
    await deleteAccountMutation.mutateAsync();
    // await signOut();
  };

  // main return
  return (
    <View className="h-full bg-white" style={{ paddingTop: top }}>
      {/* header */}
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

      {/* content */}
      <View className="px-14 pt-4">
        <WarnIcon />
        <AppText
          classText="text-[15px] font-nunito-bold"
          text={
            isConfirm
              ? t("settings:verifyDeleteAccount")
              : t("settings:deleteAccount")
          }
        />

        <AppText
          className="mt-1 text-xs"
          text={
            isConfirm
              ? t("settings:desVerifyDeleteAccount")
              : t("settings:desDeleteAccount")
          }
        />

        {isConfirm ? (
          <>
            <AppText
              text={t("settings:email")}
              className="pt-24 text-xs text-placeholder"
            />
            <AppText text={email || ""} className="text-red_1 text-lg" />
          </>
        ) : (
          <>
            <AppText text={t("settings:contact")} className="pt-24 text-base" />
            <View className="flex-row justify-between">
              <AppText
                className="w-[80%] pt-1 text-xs text-placeholder"
                text={t("settings:desContact")}
              />
              <TouchableOpacity onPress={() => setIsContact((pre) => !pre)}>
                {isContact ? <SwitchOn /> : <SwitchOff />}
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* action button */}
      {!isConfirm ? (
        <Button
          title={t("settings:continue")}
          onPress={handlePressContinue}
          className="absolute left-0 right-0 mx-14 rounded-[25px]"
          style={{ bottom: bottom + 16 }}
        />
      ) : (
        <Button
          title={t("settings:confirm")}
          onPress={handleConfirmDeleteAccount}
          className="absolute left-0 right-0 mx-14 rounded-[25px]"
          style={{ bottom: bottom + 16 }}
        />
      )}
    </View>
  );
};
