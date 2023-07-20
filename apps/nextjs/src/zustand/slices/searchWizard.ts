import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";



import { TSearchWizardStyle } from "~/types";

interface Range {
  max: number;
  min: number;
}
type LatLng = {
  latitude: number;
  longitude: number;
};
// define types for state values and actions separately
export type ISearchWizardState = {
  isCompleted: boolean;

  // objectType
  objectType: string;
  typeSearch: string;
  toggleType: string;

  // location
  location: LatLng | null;
  radius: number;

  // plotSize
  plotSize: Range | number;

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
  objectStyles: TSearchWizardStyle[];
};

export type ISearchWizardActions = {
  setIsCompleted: (val: boolean) => void;

  // objectType
  setTypeSearch: (val: string) => void;
  setToggleType: (val: string) => void;

  // location
  setLocation: (location: LatLng) => void;
  setRadius: (val: number) => void;

  // plotSize
  setPlotSize: (val: number | Range) => void;

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
  setObjectStyles: (val: TSearchWizardStyle[]) => void;

  // reset
  reset: () => void;
};

// define the initial state
const initialState: ISearchWizardState = {
  isCompleted: false,

  // objectType
  objectType: "",
  typeSearch: "",
  toggleType: "Mieten",

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
    immer<ISearchWizardState & ISearchWizardActions>((set) => ({
      ...initialState,

      setIsCompleted: (val) =>
        set((state) => {
          state.isCompleted = val;
        }),

      // objectType
      setTypeSearch: (val) =>
        set((state) => {
          state.typeSearch = val;
        }),

      setToggleType: (val) =>
        set((state) => {
          state.toggleType = val;
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