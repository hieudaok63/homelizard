import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { type RouterOutputs } from "~/utils/api";

type LatLng = {
  latitude: number;
  longitude: number;
};

export const purchaseTypeOptions = ["rent", "buy"] as const;
export const purchaseTypeSchema = z.enum(purchaseTypeOptions);
export type PurchaseType = z.infer<typeof purchaseTypeSchema>;

export const objectTypeOptions = [
  "Apartment",
  "Country house",
  "Dormitory on campus",
  "House with garden",
  "Mansion",
  "Shared apartment",
  "Town house",
  "Villa",
] as const;

export type ObjectType = (typeof objectTypeOptions)[number];

type ObjectStylesOptionValue =
  RouterOutputs["objectStyle"]["all"][number]["id"];

// define types for state values and actions separately
export type ISearchWizardState = {
  isCompleted: boolean;

  // objectType
  objectType: ObjectType;
  purchaseType: PurchaseType;

  // location
  location: LatLng | null;
  radius: number;

  // plotSize
  plotSize: number;

  // livingArea
  livingArea: number;

  // numberOfRooms
  numberOfRooms: number;

  // yearOfConstruction
  yearOfConstructionStart: number;
  yearOfConstructionEnd: number;

  //puchasePrice
  puchasePrice: number;

  // rentalPrice
  rentalPrice: number;

  // availabilityDate
  availabilityDate: Date;

  // objectStyles
  objectStyles: ObjectStylesOptionValue[];
};

export type ISearchWizardActions = {
  setIsCompleted: (val: boolean) => void;

  // objectType
  setObjectType: (val: ObjectType) => void;
  setPurchaseType: (val: PurchaseType) => void;

  // location
  setLocation: (location: LatLng) => void;
  setRadius: (val: number) => void;

  // plotSize
  setPlotSize: (val: number) => void;

  // livingArea
  setLivingArea: (val: number) => void;

  // numberOfRooms
  setNumberOfRooms: (val: number) => void;

  // yearOfConstruction
  setYearOfConstructionStart: (val: number) => void;
  setYearOfConstructionEnd: (val: number) => void;

  //puchasePrice
  setPuchasePrice: (val: number) => void;

  //rentalPrice
  setRentalPrice: (val: number) => void;

  // availabilityDate
  setAvailabilityDate: (val: Date) => void;

  // objectStyles
  setObjectStyles: (val: ObjectStylesOptionValue[]) => void;

  // reset
  reset: () => void;
};

// define the initial state
const initialState: ISearchWizardState = {
  isCompleted: false,

  // objectType
  objectType: "Apartment",
  purchaseType: "buy",

  // location
  location: null,
  radius: 10,

  // plotSize
  plotSize: 400,

  // livingArea
  livingArea: 100,

  // numberOfRooms
  numberOfRooms: 5,

  // yearOfConstruction
  yearOfConstructionStart: 1950,
  yearOfConstructionEnd: new Date()?.getFullYear(),

  // puchasePrice
  puchasePrice: 100000,

  // RentalPrice
  rentalPrice: 1000,

  // availabilityDate
  availabilityDate: new Date(),

  // objectStyles
  objectStyles: [],
};

// store
export const useSearchWizardStore = create(
  persist(
    immer<ISearchWizardState & ISearchWizardActions>((set, get) => ({
      ...initialState,

      setIsCompleted: (val) =>
        set((state) => {
          state.isCompleted = val;
        }),

      // objectType
      setObjectType: (val) =>
        set((state) => {
          state.objectType = val;
        }),

      setPurchaseType: (val) =>
        set((state) => {
          state.purchaseType = val;
        }),

      // location
      setLocation: (location) =>
        set((state) => {
          state.location = location;
        }),
      setRadius: (val) =>
        set((state) => {
          state.radius = val;
        }),

      // plotSize
      setPlotSize: (val) =>
        set((state) => {
          state.plotSize = val;
        }),

      // livingArea
      setLivingArea: (val) =>
        set((state) => {
          state.livingArea = val;
        }),

      // numberOfRooms
      setNumberOfRooms(val) {
        set((state) => {
          state.numberOfRooms = val;
        });
      },

      // yearOfConstruction
      setYearOfConstructionStart(val) {
        set((state) => {
          state.yearOfConstructionStart = val;
        });
      },
      setYearOfConstructionEnd(val) {
        set((state) => {
          state.yearOfConstructionEnd = val;
        });
      },

      // puchasePrice
      setPuchasePrice(val) {
        set((state) => {
          state.puchasePrice = val;
        });
      },

      // rentalPrice
      setRentalPrice(val) {
        set((state) => {
          state.rentalPrice = val;
        });
      },

      // availabilityDate
      setAvailabilityDate(val) {
        set((state) => {
          state.availabilityDate = val;
        });
      },

      // objectStyles
      setObjectStyles(val) {
        set((state) => {
          state.objectStyles = val;
        });
      },

      // reset
      reset() {
        set(initialState);
      },
    })),
    {
      name: "searchWizard-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => {
        // optional
        return (state, error) => {
          if (error) {
            console.log(error);
          }
        };
      },
    },
  ),
);
