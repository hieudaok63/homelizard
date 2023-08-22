import { type Percentage } from "~/components/ui";

const listScreen = [
  "ObjectType",
  "Location",
  "PlotSize",
  "LivingArea",
  "NumberOfRooms",
  // "YearOfConstruction",
  "PriceRange",
  "Availability",
  //hidden for now - WD-138
  //   "ObjectStyle",
  //   "ObjectStyleResult",
  "Results",
];

export const getCountScreen = (screen: string) => {
  const countScreen = listScreen.indexOf(screen) + 1;
  return Math.round((countScreen / listScreen.length) * 100) as Percentage;
};
