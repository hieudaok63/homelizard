import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { type SvgProps } from "react-native-svg";
import Toast from "react-native-toast-message";
import { useOAuth, type UseOAuthFlowParams } from "@clerk/clerk-expo";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";

import { ArrowLeftIcon, HomelizardLogo, SocialIcons } from "@assets/icons";

import { Spacing } from "~/utils";
import { type RootStackParams } from "./RootStackParams";

type OAuthSignInButtonProps = {
  strategy: UseOAuthFlowParams["strategy"];
  Icon: React.FC<SvgProps>;
  classContainer?: string;
};
const OAuthSignInButton = ({
  strategy,
  Icon,
  classContainer,
}: OAuthSignInButtonProps) => {
  const { startOAuthFlow } = useOAuth({ strategy });
  const handleSignInPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );
      }
    } catch (err) {
      Toast?.show({
        type: "error",
        text1: "Error!",
        text2: "Something went wrong.",
      });
    }
  }, []);
  const handler = debounce(handleSignInPress, 600, {
    leading: true,
    trailing: false,
  });

  return (
    <TouchableOpacity className={classContainer} onPress={handler}>
      {!!Icon && <Icon width={Spacing.width100} />}
    </TouchableOpacity>
  );
};

type LoginSocialScreenProps = NativeStackScreenProps<
  RootStackParams,
  "LoginSocial"
>;

export const LoginSocialScreen = ({
  navigation,
  route,
}: LoginSocialScreenProps) => {
  const { top } = useSafeAreaInsets();
  const { screen } = route.params;
  const { t } = useTranslation("auth");
  const loginEmail = () => {
    navigation?.navigate(
      screen === "Login" ? "Login" : "RegisterEmailPassword",
    );
  };

  return (
    <View className="flex h-full w-full flex-col bg-[#F7FAFF]">
      <TouchableOpacity
        className="pl-3"
        style={{ marginTop: top + 16 }}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeftIcon />
      </TouchableOpacity>

      {screen === "Login" ? (
        <View className="pt-[80px]">
          <HomelizardLogo className="self-center" />
          <Text className="nunito mb-20 text-center text-2xl font-light text-[#26233299]">
            {t("slogan_weFind")}
          </Text>
        </View>
      ) : (
        <View className="mb-6 items-center pt-[76px]">
          <Text className="mb-6 text-center text-font-18 font-weight_800 text-black_1">
            {t("weSearch")}
          </Text>
          <Text className="nunito mb-2 w-3/4 text-center text-font-14 font-weight_800 text-black_1">
            {t("searchObject")}
          </Text>
          <Text className="nunito w-3/4 text-center text-font-12 text-[#26233299]">
            {t("desSearchObject")}
          </Text>
        </View>
      )}

      <View className="flex flex-1 flex-col justify-center gap-8 pb-32">
        <View className="flex flex-row justify-center gap-8">
          <OAuthSignInButton
            classContainer="px-4"
            strategy="oauth_google"
            Icon={SocialIcons.GoogleIcon}
          />
          <OAuthSignInButton
            classContainer="px-4"
            strategy="oauth_apple"
            Icon={SocialIcons.AppleIcon}
          />
        </View>
        {/* <View className=" flex flex-row justify-center">
          <OAuthSignInButton 
            classContainer="px-4"
            strategy="oauth_facebook"
            Icon={SocialIcons.FacebookIcon}
           />
          <OAuthSignInButton
            classContainer="px-4"
            strategy="oauth_linkedin"
            Icon={SocialIcons.LinkedinIcon}
          />
        </View> */}

        <View className="flex flex-row justify-center">
          {/* {Platform.OS === "ios" && (
            <OAuthSignInButton
              classContainer="px-4"
              strategy="oauth_twitter"
              Icon={SocialIcons.TwitterIcon}
            />
          )} */}
          <TouchableOpacity onPress={loginEmail} className="px-4">
            <SocialIcons.EmailIcon width={Spacing.width107} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
