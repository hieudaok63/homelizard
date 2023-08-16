import { z } from "zod";

import {
  FavoriteNotFound,
  SearchResultNotFound,
  UserNotFound,
} from "../exceptions/errors";
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
        where: { externalId: ctx.auth.userId, deletedAt: null },
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
        where: { externalId: ctx.auth.userId, deletedAt: null },
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

  list: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { externalId: ctx.auth.userId, deletedAt: null },
    });

    if (!user) {
      throw new UserNotFound();
    }

    return ctx.prisma.favorite.findMany({
      where: { userId: user.id },
      include: {
        searchResult: { include: { realEstate: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
