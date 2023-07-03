import { z } from "zod";

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

export const objectStyleOptions = [
  "Bohemian",
  "Coastal-hamptons",
  "Contemporary",
  "French country",
  "Hollywood glam",
  "Industrial",
  "Mid-century modern",
  "Minimalistic",
  "Modern",
  "Rustic",
  "Scandinavian",
  "Shabby chic",
  "Traditional",
  "Transitional",
] as const;

export const rentBuyOptions = ["rent", "buy"] as const;

export const objectTypeSchema = z.enum(objectTypeOptions);

export const objectStyleSchema = z.enum(objectStyleOptions);

export const rentBuySchema = z.enum(rentBuyOptions);
