/* eslint-disable */

import React from "react";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { Button, View } from "react-native";
import { useOAuth, type UseOAuthFlowParams } from "@clerk/clerk-expo";

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

maybeCompleteAuthSession();

type OAuthSignInButtonProps = {
  strategy: UseOAuthFlowParams["strategy"];
  title: string;
};

const OAuthSignInButton = ({ strategy, title }: OAuthSignInButtonProps) => {
  const { startOAuthFlow } = useOAuth({ strategy });

  const handleSignInPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Button title={title} onPress={handleSignInPress} />
    </View>
  );
};

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  return (
    <>
      <OAuthSignInButton
        strategy="oauth_discord"
        title="Sign in with Discord"
      />
      <OAuthSignInButton strategy="oauth_google" title="Sign in with Google" />
    </>
  );
};

export default SignInWithOAuth;
