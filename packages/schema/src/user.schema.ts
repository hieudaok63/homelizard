import { z } from "zod";

export const genderOptions = ["male", "female", "other"] as const;

export const genderSchema = z.enum(genderOptions);

export type Gender = z.infer<typeof genderSchema>;