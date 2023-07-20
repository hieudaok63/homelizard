/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";
import { useApplicationLoadingStore, useUserStore } from "~/zustand/store";

export const useGetUserInfo = () => {
  const { isSignedIn } = useUser();
  const navigation = useRouter();
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
        navigation.push("/register/name-gender");
      }
    } catch (error) {
      console.log(error);
      // navigation?.navigate("RegisterNameGender");
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
