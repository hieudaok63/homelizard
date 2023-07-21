import { z } from "zod";

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constant/paginated.constant";
import { SearchResultNotFound } from "../exceptions/errors";
import { getPaginatedItems } from "../helpers/pagination.helper";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const searchResultRouter = createTRPCRouter({
  list: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const cursor = input.cursor;

      const items = await ctx.prisma.searchResult.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          searchProfile: true,
          realEstate: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      return {
        items,
        nextCursor,
      };
    }),

  bySearchProfileId: protectedProcedure
    .input(
      z.object({
        searchProfileId: z.string().min(1),
        page: z.number().positive().optional(),
        limit: z.number().positive().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const {
        searchProfileId,
        page = DEFAULT_PAGE,
        limit = DEFAULT_LIMIT,
      } = input;
      const [searchResults, totalItems] = await Promise.all([
        ctx.prisma.searchResult.findMany({
          where: {
            searchProfileId,
          },
          include: {
            searchProfile: true,
            realEstate: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: (page - 1) * limit,
          take: limit,
        }),
        ctx.prisma.searchResult.count({ where: { searchProfileId } }),
      ]);

      return getPaginatedItems(searchResults, page, limit, totalItems);
    }),
  byId: protectedProcedure
    .input(z.object({ searchResultId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const searchResult = await ctx.prisma.searchResult.findUnique({
        where: {
          id: input.searchResultId,
        },
        include: {
          searchProfile: true,
          realEstate: true,
        },
      });

      if (!searchResult) {
        throw new SearchResultNotFound();
      }
      return searchResult;
    }),
});
