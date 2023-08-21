import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type IToggleState = {
  toggleButton: boolean;
  toggleModal: boolean;
  toggleSideBar: boolean;
};

export type IToggleAction = {
  setToggleButton: (val: boolean) => void;
  setToggleModal: (val: boolean) => void;
  setToggleSideBar: (val: boolean) => void;
};

const initialState: IToggleState = {
  toggleButton: false,
  toggleModal: false,
  toggleSideBar: false,
};

export const useToggleStore = create(
  immer<IToggleState & IToggleAction>((set) => ({
    ...initialState,
    //ToggleButton
    setToggleButton: (val) =>
      set((state) => {
        state.toggleButton = val;
      }),

    setToggleModal: (val) =>
      set((state) => {
        state.toggleModal = val;
      }),
    setToggleSideBar: (val) =>
      set((state) => {
        state.toggleSideBar = val;
      }),
  })),
);