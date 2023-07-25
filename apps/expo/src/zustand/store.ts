import { create } from "zustand";

import { createLoadingSlice, type ILoadingSlice } from "./slices/loading";

export const useApplicationLoadingStore = create<ILoadingSlice>()((...a) => ({
  ...createLoadingSlice(...a),
}));

export { locationSlice } from "./slices/location";
export { progressSlice } from "./slices/progress";
export { useSearchWizardStore } from "./slices/searchWizard";
export { useUserStore } from "./slices/user";
