import { RealEstateObject, SearchProfile, User } from "@prisma/client";

export const userData = {
  firstName: "Test",
  lastName: "User",
  gender: "male",
} satisfies Partial<User>;

export const searchProfilesData = [
  {
    objectTypes: ["apartment_normal"],
    livingAreaSize: 300,
    latitude: 10,
    longitude: 70,
    radius: 24,
    plotSize: 800,
    roomAmount: 3,
    startYearOfConstruction: 2003,
    endYearOfConstruction: 2015,
    availability: new Date("03/12/2015"),
    purchaseType: "buy",
    minPrice: 1000,
    maxPrice: 2000,
    objectStyles: ["modern", "rustic"],
  },
  {
    objectTypes: ["apartment_normal"],
    livingAreaSize: 100,
    latitude: 20,
    longitude: 50,
    radius: 30,
    plotSize: 400,
    roomAmount: 2,
    startYearOfConstruction: 2010,
    endYearOfConstruction: 2023,
    availability: new Date("03/15/2012"),
    purchaseType: "buy",
    minPrice: 1000,
    maxPrice: 2000,
    objectStyles: ["modern"],
  },
  {
    objectTypes: ["apartment_normal"],
    livingAreaSize: 100,
    latitude: 30,
    longitude: 30,
    radius: 12,
    plotSize: 200,
    roomAmount: 3,
    startYearOfConstruction: 2011,
    endYearOfConstruction: 2023,
    availability: new Date("06/15/2022"),
    purchaseType: "rent",
    minPrice: 1000,
    maxPrice: 2000,
    objectStyles: ["modern"],
  },
] satisfies Partial<SearchProfile>[];

export const realEstateObjectsData = [
  {
    title:
      "Architektonisches Highlight - tolles Einfamilienhaus mit großem Garten in Fellheim!",
    objectTypes: ["House"],
    numberOfFloor: 3,
    livingAreaSize: 300,
    plotSize: 800,
    numberOfBedroom: 3,
    numberOfBathroom: 3,
    roomAmount: 4,
    description:
      "Architektonisches Highlight - tolles Einfamilienhaus mit großem Garten in Fellheim!",
    price: 1000,
    imageUrl: "https://fakeimg.pl/350x200/ff0000,128/000,255",
  },
  {
    title:
      "Architektonisches Highlight - tolles Einfamilienhaus mit großem Garten in Fellheim!",
    objectTypes: ["House"],
    numberOfFloor: 1,
    livingAreaSize: 200,
    plotSize: 300,
    numberOfBedroom: 5,
    numberOfBathroom: 2,
    roomAmount: 6,
    description:
      "Architektonisches Highlight - tolles Einfamilienhaus mit großem Garten in Fellheim!",
    price: 1200,
    imageUrl: "https://fakeimg.pl/350x200/ff0000,128/000,255",
  },
  {
    title:
      "Architektonisches Highlight - tolles Einfamilienhaus mit großem Garten in Fellheim!",
    objectTypes: ["Apartment"],
    numberOfFloor: 3,
    livingAreaSize: 100,
    plotSize: 200,
    numberOfBedroom: 2,
    numberOfBathroom: 1,
    roomAmount: 3,
    description:
      "Architektonisches Highlight - tolles Einfamilienhaus mit großem Garten in Fellheim!",
    price: 500,
    imageUrl: "https://fakeimg.pl/350x200/ff0000,128/000,255",
  },
] satisfies Partial<RealEstateObject>[];
