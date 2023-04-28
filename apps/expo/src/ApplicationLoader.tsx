import React, { useEffect, useState, type PropsWithChildren } from "react";
import { Image, Text, View, type ImageSourcePropType } from "react-native";
import { useAssets } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "@clerk/clerk-expo";
import {
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/nunito";

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

const useApplicationLoaded = () => {
  const { isLoaded } = useAuth();
  const [fontsLoaded] = useFonts({
    // Nunito_200ExtraLight,
    // Nunito_200ExtraLight_Italic,
    // Nunito_300Light,
    // Nunito_300Light_Italic,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    // Nunito_500Medium,
    // Nunito_500Medium_Italic,
    // Nunito_600SemiBold,
    // Nunito_600SemiBold_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
    // Nunito_800ExtraBold,
    // Nunito_800ExtraBold_Italic,
    // Nunito_900Black,
    // Nunito_900Black_Italic,
  });

  return isLoaded && fontsLoaded;
};

const ApplicationLoader: React.FC<PropsWithChildren> = ({ children }) => {
  const [assets] = useAssets([require("../assets/splash.png")]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isApplicationReady = useApplicationLoaded();

  useEffect(() => {
    if (imageLoaded) {
      void SplashScreen.hideAsync();
    }
  }, [imageLoaded]);

  if (!assets) return null;

  if (!isApplicationReady) {
    return (
      <View>
        <Image
          source={assets[0] as ImageSourcePropType}
          className="h-full w-full"
          onLoadEnd={() => {
            setImageLoaded(true);
          }}
          alt="Splash screen"
        />
        <View className="absolute flex h-full w-full flex-col items-center justify-center">
          <Text className="bg-sky-500">Loading...</Text>
        </View>
      </View>
    );
  }
  return <>{children}</>;
};

export default ApplicationLoader;
