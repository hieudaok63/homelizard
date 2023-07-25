import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { type Percentage } from "~/components/ui";

export type IProgress = {
  personalDetailProgress: Percentage;
  contactDetailProgress: Percentage;
  basicInformationProgress: Percentage;
  mobilePhoneProgress: Percentage;
  emailAndWebProgress: Percentage;
  addressProgress: Percentage;
  placeOfWorkProgress: Percentage;
};

export type IProgressAction = {
  setPersonalProgress: (val: Percentage) => void;
  setContactDetailProgress: (val: Percentage) => void;
  setBasicInformationProgress: (val: Percentage) => void;
  setMobilePhoneProgress: (val: Percentage) => void;
  setEmailAndWebProgress: (val: Percentage) => void;
  setAddressProgress: (val: Percentage) => void;
  setPlaceOfWorkProgress: (val: Percentage) => void;
};

const initialState: IProgress = {
  personalDetailProgress: 0,
  contactDetailProgress: 0,
  basicInformationProgress: 0,
  mobilePhoneProgress: 0,
  emailAndWebProgress: 0,
  addressProgress: 0,
  placeOfWorkProgress: 0,
};

export const progressSlice = create(
  persist(
    immer<IProgress & IProgressAction>((set) => ({
      ...initialState,
      setPersonalProgress: (val) =>
        set((state) => {
          state.personalDetailProgress = val;
        }),
      setContactDetailProgress: (val) =>
        set((state) => {
          state.contactDetailProgress = val;
        }),
      setBasicInformationProgress: (val) =>
        set((state) => {
          state.basicInformationProgress = val;
        }),
      setMobilePhoneProgress: (val) =>
        set((state) => {
          state.mobilePhoneProgress = val;
        }),
      setEmailAndWebProgress: (val) =>
        set((state) => {
          state.emailAndWebProgress = val;
        }),
      setAddressProgress: (val) =>
        set((state) => {
          state.addressProgress = val;
        }),
      setPlaceOfWorkProgress: (val) =>
        set((state) => {
          state.placeOfWorkProgress = val;
        }),
    })),
    {
      name: "progress-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
