import React, { type PropsWithChildren } from "react";
import Constants from "expo-constants";
import { ClerkProvider } from "@clerk/clerk-expo";

import { I18nextProvider } from "react-i18next";

import { TRPCProvider } from "./utils/api";
import { tokenCache } from "./utils/tokenCache";
import i18n from "./utils/i18n";

const RootProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ClerkProvider
        publishableKey={
          Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY as string
        }
        tokenCache={tokenCache}
      >
        <TRPCProvider>{children}</TRPCProvider>
      </ClerkProvider>
    </I18nextProvider>
  );
};

export default RootProvider;
