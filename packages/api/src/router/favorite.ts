import { z } from "zod";

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constant/paginated.constant";
import {
  FavoriteNotFound,
  SearchResultNotFound,
  UserNotFound,
} from "../exceptions/errors";
import { getPaginatedItems } from "../helpers/pagination.helper";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const favoriteRoute = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        searchResultId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { externalId: ctx.auth.userId },
      });

      if (!user) {
        throw new UserNotFound();
      }

      const searchResult = await ctx.prisma.searchResult.findUnique({
        where: { id: input.searchResultId },
        include: {
          searchProfile: {
            include: {
              customer: {
                select: {
                  users: {
                    where: { id: user.id },
                  },
                },
              },
            },
          },
        },
      });

      if (
        !searchResult ||
        !searchResult.searchProfile.customer.users.some((u) => u.id === user.id)
      ) {
        throw new SearchResultNotFound();
      }

      return ctx.prisma.favorite.create({
        data: {
          searchResultId: input.searchResultId,
          userId: user.id,
        },
      });
    }),
  removeById: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { externalId: ctx.auth.userId },
      });
      if (!user) {
        throw new UserNotFound();
      }
      const userOwnFavorite = await ctx.prisma.favorite.findFirst({
        where: { id: input, userId: user.id },
      });
      if (!userOwnFavorite) {
        throw new FavoriteNotFound();
      }
      return ctx.prisma.favorite.delete({
        where: { id: input },
      });
    }),

  list: protectedProcedure
    .input(
      z.object({
        page: z.number().positive().optional(),
        limit: z.number().positive().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { externalId: ctx.auth.userId },
      });

      if (!user) {
        throw new UserNotFound();
      }
      const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = input;
      const [favorite, totalItems] = await Promise.all([
        ctx.prisma.favorite.findMany({
          where: { userId: user.id },
          include: {
            searchResult: { include: { realEstate: true } },
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: (page - 1) * limit,
          take: limit,
        }),
        ctx.prisma.favorite.count({
          where: { userId: user.id },
        }),
      ]);
      return getPaginatedItems(favorite, page, limit, totalItems);
    }),
});
