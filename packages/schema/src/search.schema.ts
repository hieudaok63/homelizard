import { z } from "zod";

import { objectStyleOptions } from "./objectStyles.schema";

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

export const rentBuyOptions = ["rent", "buy"] as const;

export const objectTypeSchema = z.enum(objectTypeOptions);

export const objectStyleSchema = z.enum(objectStyleOptions);

export const rentBuySchema = z.enum(rentBuyOptions);

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGTITUDE = -180;
const MAX_LONGTITUDE = 180;

export const searchProfileSchema = z.object({
  objectType: objectTypeSchema,
  objectStyles: z.array(z.string()).min(1),
  livingAreaSize: z.number().positive(),
  roomAmount: z.number().positive(),
  latitude: z.number().min(MIN_LATITUDE).max(MAX_LATITUDE),
  longitude: z.number().min(MIN_LONGTITUDE).max(MAX_LONGTITUDE),
  radius: z.number().positive(),
  plotSize: z.number().positive(),
  startYearOfConstruction: z.number().positive(),
  endYearOfConstruction: z.number().positive(),
  availability: z.date(),
  rentOrBuy: rentBuySchema,
  minPrice: z.number().positive(),
  maxPrice: z.number().positive(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      zipCode: z.string(),
      country: z.string(),
    })
    .optional(),
});
