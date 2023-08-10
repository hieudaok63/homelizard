import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type IUploadProfilePicture = {
  isModalOpen: boolean;
};

export type IUploadProfilePictureAction = {
  setIsModalOpen: (val: boolean) => void;
};

const initialState: IUploadProfilePicture = {
  isModalOpen: false,
};

export const useUploadProfilePictureStore = create(
  immer<IUploadProfilePicture & IUploadProfilePictureAction>((set) => ({
    ...initialState,
    setIsModalOpen: (val) =>
      set((state) => {
        state.isModalOpen = val;
      }),
  })),
);
