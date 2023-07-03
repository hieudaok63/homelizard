import { z } from "zod";

import {
  objectStyleSchema,
  objectTypeSchema,
  rentBuySchema,
} from "@homelizard/schema";

import { CustomerNotFound } from "../exceptions/errors";
import { PriceValidateError } from "../exceptions/errors/priceValidateError.error";
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.maxPrice < input.minPrice) {
        throw new PriceValidateError();
      }
      const newSearchInput = {
        ...input,
        address: input.address
          ? {
              create: input.address,
            }
          : undefined,
      };

      const customer = await ctx.prisma.customer.findFirst({
        where: { users: { some: { externalId: ctx.auth.userId } } },
      });

      if (!customer) {
        throw new CustomerNotFound();
      }

      return ctx.prisma.searchProfile.create({
        data: {
          ...newSearchInput,
          customer: {
            connect: {
              id: customer.id,
            },
          },
        },
      });
    }),
});
