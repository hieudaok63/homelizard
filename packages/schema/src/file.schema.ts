import { z } from "zod";

export const fileTypeOptions = ["curriculumVitae"] as const;

export const fileTypeSchema = z.enum(fileTypeOptions);
