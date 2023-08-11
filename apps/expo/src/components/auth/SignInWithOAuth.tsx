/* eslint-disable */

import React from "react";
import Toast from "react-native-toast-message";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { useOAuth, type UseOAuthFlowParams } from "@clerk/clerk-expo";

import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { Button } from "../ui";

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
      Toast?.show({
        type: "error",
        text1: "Error!",
        text2: "Something went wrong.",
      });
    }
  }, []);

  return (
    <Button
      title={title}
      onPress={handleSignInPress}
      className="rounded-full"
    />
  );
};

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  return (
    <>
      <OAuthSignInButton strategy="oauth_google" title="Anmeldung mit Google" />
      <OAuthSignInButton strategy="oauth_apple" title="Anmeldung mit Apple" />
    </>
  );
};

export default SignInWithOAuth;
