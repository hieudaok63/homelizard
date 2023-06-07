import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createLoadingSlice, type ILoadingSlice } from "./slices/loading";
import {
  createSearchWizardSlice,
  type ISearchWizardSlice,
} from "./slices/searchWizard";

export const useSearchWizardStore = create<ISearchWizardSlice>()(
  persist(
    (...a) => ({
      ...createSearchWizardSlice(...a),
    }),
    { name: "bound-store", storage: createJSONStorage(() => AsyncStorage) },
  ),
);

export const useApplicationLoadingStore = create<ILoadingSlice>()((...a) => ({
  ...createLoadingSlice(...a),
}));
