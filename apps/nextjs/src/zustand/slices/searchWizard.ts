import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// define types for state values and actions separately
export type ISearchWizardState = {
  isCompleted: boolean;

  // objectType
  objectType: string;

  // location
  location: null;
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
  objectStyles: Array<string>;
};

export type ISearchWizardActions = {
  setIsCompleted: (val: boolean) => void;

  // objectType
  setObjectType: (val: string) => void;

  // location
  setLocation: (location: null) => void;
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
  setObjectStyles: (val: Array<string>) => void;

  // reset
  reset: () => void;
};

// define the initial state
const initialState: ISearchWizardState = {
  isCompleted: false,

  // objectType
  objectType: "",

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
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
