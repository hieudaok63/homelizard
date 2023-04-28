import React from "react";
import { Text } from "react-native";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";

const AuthIndicator = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded)
    return (
      <Text className="mx-auto pb-2 text-xl font-bold text-white">
        Auth is loading...
      </Text>
    );

  return (
    <>
      <SignedIn>
        <Text className="mx-auto pb-2 text-xl font-bold text-white">
          User is signedIn
        </Text>
      </SignedIn>
      <SignedOut>
        <Text className="mx-auto pb-2 text-xl font-bold text-white">
          User is signedOut
        </Text>
      </SignedOut>
    </>
  );
};

export default AuthIndicator;
