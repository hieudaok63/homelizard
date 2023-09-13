import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, ImageSourcePropType, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useAssets } from "expo-asset";

interface LoggedOutSplashProps {
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  goToScreen: () => void;
}
export const LoggedOutSplash = ({
  setImageLoaded,
  goToScreen,
}: LoggedOutSplashProps) => {
  const [backgroundImage] = useAssets([
    require("../../../../assets/ImageBackgroundSplash.png"),
  ]);
  const [logoApp] = useAssets([require("../../../../assets/LogoApp.png")]);
  const [imageCity] = useAssets([
    require("../../../../assets/undraw_best_place_r685.png"),
  ]);
  const fadeAnimImageCity = useRef(new Animated.Value(0)).current;

  //new
  const opacityLogoApp = useRef(new Animated.Value(0)).current;
  const moveLogoApp = useRef(new Animated.Value(0)).current;
  // const { bottom, top } = useSafeAreaInsets();
  const opacitySlogan = useRef(new Animated.Value(0)).current;
  const moveSlogan = useRef(new Animated.Value(0)).current;
  // animation logo app
  useEffect(() => {
    Animated.sequence([
      Animated.timing(moveLogoApp, {
        duration: 500,
        toValue: Dimensions.get("window").height / 4,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(moveLogoApp, {
        duration: 2000,
        toValue: Dimensions.get("window").height / 2.4,
        delay: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [moveLogoApp]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacityLogoApp, {
        duration: 1500,
        toValue: 1,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(opacityLogoApp, {
        duration: 0,
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(opacityLogoApp, {
        duration: 0,
        toValue: 1,
        delay: 1600,
        useNativeDriver: false,
      }),
    ]).start();
  }, [opacityLogoApp]);
  // Text Logo
  useEffect(() => {
    Animated.sequence([
      Animated.timing(moveSlogan, {
        duration: 500,
        toValue: Dimensions.get("window").height / 2.4,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(moveSlogan, {
        duration: 1300,
        toValue: Dimensions.get("window").height / 1.8,
        delay: 1300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setTimeout(() => {
        goToScreen();
      }, 500);
    });
  }, [moveSlogan]);
  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacitySlogan, {
        duration: 0,
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(opacitySlogan, {
        duration: 500,
        toValue: 1,
        delay: 500,
        useNativeDriver: false,
      }),
    ]).start(() => {});
  }, [opacitySlogan]);
  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnimImageCity, {
        duration: 0,
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnimImageCity, {
        duration: 1000,
        toValue: 1,
        delay: 500,
        useNativeDriver: false,
      }),

      Animated.timing(fadeAnimImageCity, {
        duration: 2500,
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
    ]).start();
  }, [fadeAnimImageCity]);
  if (!logoApp || !backgroundImage || !imageCity) return null;

  return (
    <SafeAreaView className="flex-1 bg-[#F7FAFF]" edges={["top"]}>
      <View className="flex-1">
        <Animated.Image
          className="w-full"
          resizeMode={"contain"}
          onLoadEnd={() => {
            setImageLoaded(true);
          }}
          style={[
            {
              marginTop: moveLogoApp,
              opacity: opacityLogoApp,
            },
          ]}
          source={logoApp[0] as ImageSourcePropType}
        />
        <Animated.Text
          className={"text-center text-2xl font-light"}
          style={[
            {
              opacity: opacitySlogan,
              position: "absolute",
              color: "rgba(38, 35, 50, 0.60)",
              top: moveSlogan,
              left: 0,
              right: 0,
            },
          ]}
        >
          Wir finden deine Immobilie
        </Animated.Text>

        <Animated.Image
          resizeMode={"cover"}
          style={{ opacity: fadeAnimImageCity }}
          source={imageCity[0] as ImageSourcePropType}
          className={"absolute bottom-0 left-0 right-0 h-[303px] w-full"}
        />
      </View>
    </SafeAreaView>
  );
};
