import { z } from "zod";

export const requestObjectSchema = z.object({
    realEstateObjectId: z.string(),
});
