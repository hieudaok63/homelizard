import { type StateCreator } from "zustand";

export interface ILoadingSlice {
  loading: boolean;
  setLoading: (status: boolean) => void;
}

export const createLoadingSlice: StateCreator<
  ILoadingSlice,
  [],
  [],
  ILoadingSlice
> = (set) => ({
  loading: false,
  setLoading: (status) => {
    set(() => ({ loading: status }));
  },
});
