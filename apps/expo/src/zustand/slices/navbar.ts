import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// define the initial state
type IInitState = {
  open: boolean;
};
const initialState: IInitState = {
  open: false,
};

type IUserActions = {
  setOpen: (val: boolean) => void;

  // reset
  reset: () => void;
};

export const useNavbarStore = create(
  immer<IInitState & IUserActions>((set) => ({
    ...initialState,

    setOpen(val) {
      set((state) => {
        state.open = val;
      });
    },

    // reset
    reset() {
      set(initialState);
    },
  })),
);
