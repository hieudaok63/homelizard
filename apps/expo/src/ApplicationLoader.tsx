import React, { useEffect, useState, type PropsWithChildren } from "react";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "@clerk/clerk-expo";
import {
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  Nunito_800ExtraBold_Italic,
  useFonts,
} from "@expo-google-fonts/nunito";

import { useApplicationLoadingStore } from "~/zustand/store";
import { LoggedInSplash, LoggedOutSplash } from "./components/ui";
import { FullScreenLoading } from "./components/ui/loading";

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

const useApplicationLoaded = () => {
  const { isLoaded } = useAuth();
  const [fontsLoaded] = useFonts({
    // Nunito_200ExtraLight,
    // Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    // Nunito_300Light_Italic,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    // Nunito_500Medium,
    // Nunito_500Medium_Italic,
    Nunito_600SemiBold,
    // Nunito_600SemiBold_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold,
    Nunito_800ExtraBold_Italic,
    // Nunito_900Black,
    // Nunito_900Black_Italic,
  });

  return isLoaded && fontsLoaded;
};

const ApplicationLoader: React.FC<PropsWithChildren> = ({ children }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isApplicationReady = useApplicationLoaded();
  const { isSignedIn } = useAuth();
  const [loadingSplash, setLoadingSplash] = useState(true);
  // global states
  const appLoading = useApplicationLoadingStore((state) => state?.loading);

  useEffect(() => {
    if (imageLoaded || !isApplicationReady) {
      void SplashScreen.hideAsync();
    }
  }, [imageLoaded, isApplicationReady]);

  if (!isApplicationReady) {
    return <FullScreenLoading status={!isApplicationReady} />;
  }

  if (loadingSplash) {
    if (isSignedIn) {
      return (
        <LoggedInSplash
          setImageLoaded={setImageLoaded}
          goToScreen={() => setLoadingSplash(false)}
        />
      );
    } else {
      return (
        <LoggedOutSplash
          setImageLoaded={setImageLoaded}
          goToScreen={() => setLoadingSplash(false)}
        />
      );
    }
  }

  return (
    <>
      {children}
      {/* App loading */}
      <FullScreenLoading status={appLoading} />
      {/* App toast message */}
      <Toast />
    </>
  );
};

export default ApplicationLoader;
