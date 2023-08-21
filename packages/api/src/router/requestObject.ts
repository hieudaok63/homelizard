import { z } from "zod";

import { requestObjectSchema } from "@homelizard/schema";

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constant/paginated.constant";
import { EStatusUserRequestObject } from "../enums/base.enum";
import { RealEstateObjectNotFound, UserNotFound } from "../exceptions/errors";
import { getPaginatedItems } from "../helpers/pagination.helper";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const requestRouter = createTRPCRouter({
  requestObject: protectedProcedure
    .input(requestObjectSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          externalId: ctx.auth.userId,
        },
      });

      if (!user) {
        throw new UserNotFound();
      }

      const object = await ctx.prisma.realEstateObject.findFirst({
        where: {
          id: input.realEstateObjectId,
        },
      });

      if (!object) {
        throw new RealEstateObjectNotFound();
      }

      return await ctx.prisma.request.create({
        data: {
          realEstateObjectId: object.id,
          userId: user.id,
          status: EStatusUserRequestObject.OPEN,
        },
      });
    }),
  list: protectedProcedure
    .input(
      z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = input;
      const [listRequests, totalItems] = await Promise.all([
        ctx.prisma.request.findMany({
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                middleName: true,
              },
            },
            realEstateObject: {
              select: {
                title: true,
                objectType: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: (page - 1) * limit,
          take: limit,
        }),
        ctx.prisma.request.count(),
      ]);

      return getPaginatedItems(listRequests, page, limit, totalItems);
    }),
});
