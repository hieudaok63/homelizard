/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";

import { api } from "~/utils/api";
import { type RootStackParams } from "~/screens/routes";
import { useApplicationLoadingStore, useUserStore } from "~/zustand/store";

export const useGetUserInfo = () => {
  const { isSignedIn } = useUser();
  const navigation = useNavigation<RootStackParams>();
  const trpc = api.useContext();
  const setLoadingApp = useApplicationLoadingStore((state) => state.setLoading);
  const setUser = useUserStore((state) => state?.setUser);
  const resetUser = useUserStore((state) => state?.reset);

  const getUser = async () => {
    try {
      setLoadingApp(true);
      const res = await trpc.client.user.userInfo.query();

      setUser(res);

      if (isSignedIn && !res?.gender) {
        navigation?.navigate("RegisterNameGender");
      }
    } catch (error) {
      console.log(error);
      navigation?.navigate("RegisterNameGender");
      resetUser();
    } finally {
      setLoadingApp(false);
    }
  };

  // get user info if isSignedIn
  useEffect(() => {
    if (isSignedIn) {
      void getUser();
    }

    if (!isSignedIn) {
      resetUser();
    }
  }, [isSignedIn]);
};
