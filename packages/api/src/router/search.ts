import { searchProfileSchema } from "@homelizard/schema";

import { CustomerNotFound } from "../exceptions/errors";
import { PriceValidateError } from "../exceptions/errors/priceValidateError.error";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const searchRouter = createTRPCRouter({
  searchProfile: protectedProcedure
    .input(searchProfileSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.maxPrice < input.minPrice) {
        throw new PriceValidateError();
      }

      const customer = await ctx.prisma.customer.findFirst({
        where: { users: { some: { externalId: ctx.auth.userId } } },
      });

      if (!customer) {
        throw new CustomerNotFound();
      }

      return ctx.prisma.searchProfile.create({
        data: {
          ...input,
          address: input.address
            ? {
                create: input.address,
              }
            : undefined,
          objectStyles: {
            create: input.objectStyles.map((objectStyle) => ({
              title: objectStyle,
            })),
          },
          customer: {
            connect: {
              id: customer.id,
            },
          },
        },
      });
    }),
});
