import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

import { TRPCProvider } from "~/utils/api";
import Constants from "expo-constants";
import { tokenCache } from "~/utils/tokenCache";
import { SignInSignUpScreen } from "~/screens/signin";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY as string}
      tokenCache={tokenCache}
    >
      <SignedIn>
      <TRPCProvider>
        <SafeAreaProvider>
          {/*
            The Stack component displays the current page.
            It also allows you to configure your screens 
          */}
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#f472b6",
              },
            }}
          />
          <StatusBar />
        </SafeAreaProvider>
      </TRPCProvider>
      </SignedIn>
      <SignedOut>
        <SignInSignUpScreen />
      </SignedOut>
    </ClerkProvider>
  );
};

export default RootLayout;
