import { useEffect } from "react";
import { BackHandler } from "react-native";

export const useDisableBackButton = () => {
  const backBtnFunc = () => {
    return true;
  };

  // effects
  // disable back button
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backBtnFunc);
    // unmount
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backBtnFunc);
    };
  }, []);
};
