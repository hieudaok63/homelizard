import { z } from "zod";

import { requestObjectSchema } from "@homelizard/schema";

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constant/paginated.constant";
import {
  RealEstateObjectNotFound,
  RequestNotFound,
  UserNotFound,
} from "../exceptions/errors";
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

      const newRequest = await ctx.prisma.request.create({
        data: {
          realEstateObjectId: object.id,
          userId: user.id,
        },
      });

      const _firstHistory = await ctx.prisma.requestHistory.create({
        data: {
          requestId: newRequest.id,
          note: "Anfrage über die App gestellt.",
          date: new Date(),
        },
      });

      return newRequest;
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
  byId: protectedProcedure
    .input(
      z.object({
        searchRequestId: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { searchRequestId } = input;
      return await ctx.prisma.request.findUnique({
        include: {
          user: true,
          realEstateObject: true,
          requestHistories: {
            orderBy: {
              date: "desc",
            },
          },
        },
        where: {
          id: searchRequestId,
        },
      });
    }),
  listRequestsOfObject: protectedProcedure
    .input(
      z.object({
        objectId: z.string().min(1),
        page: z.number().optional(),
        limit: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { objectId, page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = input;

      const [listRequests, totalItems] = await Promise.all([
        ctx.prisma.request.findMany({
          where: {
            realEstateObjectId: objectId,
          },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                middleName: true,
              },
            },
          },
        }),
        ctx.prisma.request.count({
          where: {
            realEstateObjectId: objectId,
          },
        }),
      ]);
      return getPaginatedItems(listRequests, page, limit, totalItems);
    }),
  createHistory: protectedProcedure
    .input(
      z.object({
        requestId: z.string(),
        note: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const request = await ctx.prisma.user.findFirst({
        where: {
          id: input.requestId,
        },
      });

      if (!request) {
        throw new RequestNotFound();
      }

      return await ctx.prisma.requestHistory.create({
        data: input,
      });
    }),
  updateHistory: protectedProcedure
    .input(
      z.object({
        historyId: z.string(),
        note: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { historyId, note } = input;

      return ctx.prisma.requestHistory.update({
        where: { id: historyId },
        data: {
          note,
        },
      });
    }),
  deleteHistory: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.delete({ where: { id: input } });
    }),
});
