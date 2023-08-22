import { z } from "zod";

import { objectStyleOptions } from "./objectStyles.schema";

export const objectTypeOptions = [
  "apartment_normal",
  "apartment_maisonette",
  "apartment_attic",
  "apartment_penthouse",
  "apartment_terraced",
  "apartment_studio",
  "house_detached",
  "house_semi_detached",
  "house_row_corner",
  "house_row_middle",
  "house_farm",
  "Multi-Family house",
] as const;
export type ObjectType = (typeof objectTypeOptions)[number];
export type ObjectSelectType = "houseList" | "apartementList" | "MFH" | null;
export const purchaseTypeOptions = ["rent", "buy"] as const;

export const objectTypeSchema = z.enum(objectTypeOptions);

export const objectStyleSchema = z.enum(objectStyleOptions);

export const purchaseTypeSchema = z.enum(purchaseTypeOptions);

export type PurchaseType = z.infer<typeof purchaseTypeSchema>;

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGTITUDE = -180;
const MAX_LONGTITUDE = 180;

export const searchProfileSchema = z.object({
  objectTypes: z.array(objectTypeSchema).min(1),
  livingAreaSize: z.number().positive(),
  roomAmount: z.number().positive(),
  latitude: z.number().min(MIN_LATITUDE).max(MAX_LATITUDE),
  longitude: z.number().min(MIN_LONGTITUDE).max(MAX_LONGTITUDE),
  radius: z.number().positive(),
  plotSize: z.number().positive(),
  availability: z.date(),
  purchaseType: purchaseTypeSchema,
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
  // objectStyles: z.array(objectStyleSchema).min(1),
  // startYearOfConstruction: z.number().positive(),
  // endYearOfConstruction: z.number().positive(),
});
