import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type IToggleBtnState = {
  toggleButton: boolean;
};

export type IToggleBtnAction = {
  setToggleButton: (val: boolean) => void;
};

const initialState: IToggleBtnState = {
  toggleButton: false,
};

export const useToggleBtnStore = create(
  persist(
    immer<IToggleBtnState & IToggleBtnAction>((set) => ({
      ...initialState,
      setToggleButton: (val) =>
        set((state) => {
          state.toggleButton = val;
        }),
    })),
    {
      name: "toggleButton-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
