import { type LatLng } from "react-native-maps";
import { type StateCreator } from "zustand";

export interface ISearchWizardSlice {
  // objectType
  objectType: string;
  setObjectType: (val: string) => void;

  // location
  location: LatLng | null;
  radius: number;
  setLocation: (location: LatLng) => void;
  setRadius: (val: number) => void;

  // plotSize
  plotSize: number;
  setPlotSize: (val: number) => void;

  // livingArea
  livingArea: number;
  setLivingArea: (val: number) => void;

  // numberOfRooms
  numberOfRooms: number;
  setNumberOfRooms: (val: number) => void;

  // yearOfConstruction
  yearOfConstructionStart: number;
  yearOfConstructionEnd: number;
  setYearOfConstructionStart: (val: number) => void;
  setYearOfConstructionEnd: (val: number) => void;

  // availabilityDate
  availabilityDate: Date;
  setAvailabilityDate: (val: Date) => void;

  // objectStyles
  objectStyles: Array<string>;
  setObjectStyles: (val: Array<string>) => void;
}

export const createSearchWizardSlice: StateCreator<
  ISearchWizardSlice,
  [],
  [],
  ISearchWizardSlice
> = (set, get) => ({
  // objectType
  objectType: "",
  setObjectType(val) {
    set(() => ({ objectType: val }));
  },

  // location
  location: null,
  radius: 10,
  setLocation(location) {
    set(() => ({ location: location }));
  },
  setRadius(val) {
    set(() => ({ radius: val }));
  },

  // plotSize
  plotSize: 400,
  setPlotSize(val) {
    set(() => ({ plotSize: val }));
  },

  // livingArea
  livingArea: 100,
  setLivingArea(val) {
    set(() => ({ livingArea: val }));
  },

  // numberOfRooms
  numberOfRooms: 5,
  setNumberOfRooms(val) {
    set(() => ({ numberOfRooms: val }));
  },

  // yearOfConstruction
  yearOfConstructionStart: 1950,
  yearOfConstructionEnd: new Date()?.getFullYear(),
  setYearOfConstructionStart(val) {
    set(() => ({ yearOfConstructionStart: val }));
  },
  setYearOfConstructionEnd(val) {
    set(() => ({ yearOfConstructionEnd: val }));
  },

  // availabilityDate
  availabilityDate: new Date(),
  setAvailabilityDate(val) {
    set(() => ({ availabilityDate: val }));
  },

  // objectStyles
  objectStyles: [],
  setObjectStyles(val) {
    set(() => ({ objectStyles: val }));
  },
});
