import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { type User } from ".prisma/client";

export type IUserActions = {
  setUser: (val: User) => void;

  // reset
  reset: () => void;
};

// define the initial state
type IInitState = {
  userData: User | null;
};
const initialState: IInitState = {
  userData: null,
};

export const useUserStore = create(
  persist(
    immer<IInitState & IUserActions>((set) => ({
      ...initialState,

      setUser(val) {
        set((state) => {
          state.userData = val;
        });
      },

      // reset
      reset() {
        set(initialState);
      },
    })),
    {
      name: "searchWizard-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
