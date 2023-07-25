import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type Location = {
  latitude?: number;
  longitude?: number;
  city?: string | null;
  country?: string | null;
  zipCode?: string | null;
  street?: string | null;
  name?: string | null;
};

export type ILocationParam = Omit<Location, "id" | "latitude" | "longitude">;

export type ILocation = {
  address: Location;
  addressParam: ILocationParam;
};

const initialState: ILocation = {
  address: {
    latitude: 0,
    longitude: 0,
    city: "",
    country: "",
    zipCode: "",
    street: "",
    name: "",
  },
  addressParam: {
    city: "",
    country: "",
    zipCode: "",
    street: "",
  },
};

export type IProgressAction = {
  setAddressUser: (val: Location) => void;
  setAddressParam: (val: ILocationParam) => void;
};

export const locationSlice = create(
  persist(
    immer<ILocation & IProgressAction>((set) => ({
      ...initialState,
      setAddressUser: (val: Location) =>
        set((state) => {
          state.address = val;
        }),
      setAddressParam: (val: ILocationParam) =>
        set((state) => {
          state.addressParam = val;
        }),
    })),
    {
      name: "location-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
