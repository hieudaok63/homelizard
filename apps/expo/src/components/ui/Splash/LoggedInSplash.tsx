import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, ImageSourcePropType, View } from "react-native";
import { useAssets } from "expo-asset";

interface LoggedInSplashProps {
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  goToScreen: () => void;
}
export const LoggedInSplash = ({
  setImageLoaded,
  goToScreen,
}: LoggedInSplashProps) => {
  const [logoApp] = useAssets([require("../../../../assets/LogoApp.png")]);
  const logoAnimNotLogin = useRef(
    new Animated.Value(Dimensions.get("window").height / 5),
  ).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoAnimNotLogin, {
        duration: 500,
        toValue: Dimensions.get("window").height / 2 - 100,
        delay: 500,
        useNativeDriver: false,
      }),
    ]).start();
    Animated.timing(fadeAnim, {
      duration: 0,
      toValue: 1,
      delay: 1000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        goToScreen();
      }, 500);
    });
  }, [logoAnimNotLogin, fadeAnim]);

  if (!logoApp) return null;
  return (
    <View
      className="flex-1"
      // style={{ alignItems: "center", justifyContent: "center" }}
    >
      <View className="w-full">
        <Animated.Image
          className="w-full"
          resizeMode={"contain"}
          style={[
            {
              marginTop: logoAnimNotLogin,
            },
          ]}
          source={logoApp[0] as ImageSourcePropType}
          onLoadEnd={() => {
            setImageLoaded(true);
          }}
        />
      </View>
      <Animated.Text
        className={"absolute text-center text-2xl font-light"}
        style={[
          {
            opacity: fadeAnim,
            color: "rgba(38, 35, 50, 0.60)",
            bottom: Dimensions.get("window").height / 2 - 30,
            left: 0,
            right: 0,
          },
        ]}
      >
        Wir finden deine Immobilie
      </Animated.Text>
    </View>
  );
};
