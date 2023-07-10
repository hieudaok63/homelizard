import { type LatLng } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { type ObjectStyleOption, type ObjectType } from "@homelizard/schema";

// define types for state values and actions separately
export type ISearchWizardState = {
  isCompleted: boolean;

  // objectType
  objectType: ObjectType | null;

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

  // availabilityDate
  availabilityDate: Date;

  // objectStyles
  objectStyles: Array<ObjectStyleOption>;
};

export type ISearchWizardActions = {
  setIsCompleted: (val: boolean) => void;

  // objectType
  setObjectType: (val: ObjectType) => void;

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

  // availabilityDate
  setAvailabilityDate: (val: Date) => void;

  // objectStyles
  toggleObjectStyle: (val: ObjectStyleOption) => void;
  setObjectStyles: (val: Array<ObjectStyleOption>) => void;

  // reset
  reset: () => void;
};

// define the initial state
const initialState: ISearchWizardState = {
  isCompleted: false,

  // objectType
  objectType: null,

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

  // availabilityDate
  availabilityDate: new Date(),

  // objectStyles
  objectStyles: [],
};

// store
export const useSearchWizardStore = create(
  persist(
    immer<ISearchWizardState & ISearchWizardActions>((set) => ({
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

      // availabilityDate
      setAvailabilityDate(val) {
        set((state) => {
          state.availabilityDate = val;
        });
      },

      // objectStyles
      toggleObjectStyle(val) {
        set((state) => {
          if (state.objectStyles.includes(val)) {
            state.objectStyles = state.objectStyles.filter(
              (item) => item !== val,
            );
          } else {
            state.objectStyles.push(val);
          }
        });
      },
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
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
