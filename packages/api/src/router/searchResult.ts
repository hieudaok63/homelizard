import { z } from "zod";

import { type SearchResult } from "@homelizard/db";

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constant/paginated.constant";
import { getPaginatedItems } from "../helpers/pagination.helper";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const searchResultRouter = createTRPCRouter({
  list: protectedProcedure
    .input(
      z.object({
        page: z.number().positive().optional(),
        limit: z.number().positive().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = input;
      const [searchResults, totalItems] = await Promise.all([
        ctx.prisma.searchResult.findMany({
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
        ctx.prisma.searchResult.count(),
      ]);

      return getPaginatedItems<SearchResult>(
        searchResults,
        page,
        limit,
        totalItems,
      );
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

      return getPaginatedItems<SearchResult>(
        searchResults,
        page,
        limit,
        totalItems,
      );
    }),
});
