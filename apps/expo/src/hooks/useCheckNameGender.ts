/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation, type NavigationProp } from "@react-navigation/native";

import { api } from "~/utils/api";
import { type RootStackParams } from "~/screens/RootStackParams";
import { useApplicationLoadingStore } from "~/zustand/store";

export const useCheckNameGender = () => {
  const { isSignedIn } = useUser();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const trpc = api.useContext();
  const setLoadingApp = useApplicationLoadingStore((state) => state.setLoading);

  const testTrpc = async () => {
    try {
      if (!isSignedIn) return;

      setLoadingApp(true);
      const res = await trpc.client.user.userInfo.query();
      // setUser(res);

      if (isSignedIn && (!res?.firstName || !res?.lastName)) {
        navigation?.navigate("RegisterNameGender");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingApp(false);
    }
  };

  // check if user has add name and gender (based on clerk for now, will be intergated with trpc later on)
  useEffect(() => {
    void testTrpc();
  }, []);
};
