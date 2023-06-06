import { z } from "zod";

import { objectStyleSchema, objectTypeSchema } from "@homelizard/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGTITUDE = -180;
const MAX_LONGTITUDE = 180;

export const searchRouter = createTRPCRouter({
  searchProfile: protectedProcedure
    .input(
      z.object({
        objectType: objectTypeSchema,
        objectStyle: objectStyleSchema,
        livingAreaSize: z.number().positive(),
        roomAmount: z.number().positive(),
        latitude: z.number().min(MIN_LATITUDE).max(MAX_LATITUDE),
        longitude: z.number().min(MIN_LONGTITUDE).max(MAX_LONGTITUDE),
        radius: z.number().positive(),
        plotSize: z.number().positive(),
        startYearOfConstruction: z.number().positive(),
        endYearOfConstruction: z.number().positive(),
        availability: z.date(),
        address: z
          .object({
            street: z.string(),
            city: z.string(),
            zipCode: z.string(),
            country: z.string(),
          })
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newSearchInput = {
        ...input,
        address: input.address
          ? {
              create: input.address,
            }
          : undefined,
      };

      return ctx.prisma.searchProfile.create({
        data: {
          ...newSearchInput,
        },
      });
    }),
});
