import { create } from "zustand";

import { createLoadingSlice, type ILoadingSlice } from "./slices/loading";

export const useBoundStore = create<ILoadingSlice>()((...a) => ({
  ...createLoadingSlice(...a),
}));
