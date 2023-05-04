import React, { type PropsWithChildren } from "react";
import Constants from "expo-constants";
import { ClerkProvider } from "@clerk/clerk-expo";

import { TRPCProvider } from "./utils/api";
import { tokenCache } from "./utils/tokenCache";

const RootProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ClerkProvider
      publishableKey={
        Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY as string
      }
      tokenCache={tokenCache}
    >
      <TRPCProvider>{children}</TRPCProvider>
    </ClerkProvider>
  );
};

export default RootProvider;
