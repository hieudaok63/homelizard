/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";

import { api } from "~/utils/api";
import { type RootStackParams } from "~/screens/routes";

export const useCheckNameGender = () => {
  const { user, isSignedIn } = useUser();
  const navigation = useNavigation<RootStackParams>();
  const trpc = api.useContext();

  const testTrpc = async () => {
    const res = await trpc.client.auth.getSecretMessage.query();
    console.log("res trpc: ", res); // for debug
  };

  // check if user has add name and gender (based on clerk for now, will be intergated with trpc later on)
  useEffect(() => {
    console.log("user: ", user); // for debug

    if (isSignedIn && (!user?.firstName || !user?.lastName)) {
      navigation?.navigate("RegisterNameGender");
    }

    // test trpc
    if (isSignedIn) {
      void testTrpc();
    }
  }, [user, isSignedIn]);
};
