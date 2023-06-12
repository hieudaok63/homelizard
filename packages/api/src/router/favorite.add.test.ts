import { type SignedInAuthObject } from "@clerk/nextjs/api";
import { type inferProcedureInput } from "@trpc/server";
import { beforeAll, beforeEach, expect, test } from "vitest";

import { prisma } from "@homelizard/db";

import { appRouter, type AppRouter } from "../root";

const clerkUserId = "123";
const userId = "1";
const searchResultId = "123";

beforeAll(async () => {
  if (
    !(await prisma.searchResult.findUnique({ where: { id: searchResultId } }))
  ) {
    await prisma.searchResult.create({
      data: {
        id: searchResultId,
        realEstate: {
          create: {
            description: "some description",
            title: "some title",
            livingAreaSize: 100,
            objectType: "apartment",
            numberOfBedroom: 3,
            numberOfBathroom: 2,
            numberOfFloor: 1,
            plotSize: 100,
            price: 2000,
            roomAmount: 4,
          },
        },
        searchProfile: {
          create: {
            availability: new Date(),
            startYearOfConstruction: 1990,
            endYearOfConstruction: 2000,
            latitude: 1,
            longitude: 1,
            radius: 100,
            livingAreaSize: 100,
            objectStyle: "foo",
            objectType: "apartment",
            plotSize: 100,
            roomAmount: 4,
            customer: {
              create: {
                users: {
                  create: {
                    id: userId,
                    email: "test@test.de",
                    externalId: clerkUserId,
                    firstName: "John",
                    lastName: "Doe",
                    gender: "male",
                  },
                },
              },
            },
          },
        },
      },
    });
  }
});

beforeEach(async () => {
  if (
    await prisma.favorite.findUnique({
      where: {
        searchResultId_userId: {
          searchResultId,
          userId,
        },
      },
    })
  ) {
    await prisma.favorite.delete({
      where: {
        searchResultId_userId: {
          searchResultId,
          userId,
        },
      },
    });
  }
});

test("addFavorite", async () => {
  const caller = appRouter.createCaller({
    auth: {
      userId: clerkUserId,
    } as SignedInAuthObject,
    prisma,
  });

  type Input = inferProcedureInput<AppRouter["favorite"]["add"]>;

  const input: Input = {
    searchResultId: "123",
  };

  const result = await caller.favorite.add(input);

  expect(result).toMatchObject({ searchResultId: "123", userId: "1" });
});

test("adding Favorite twice fails", async () => {
  const caller = appRouter.createCaller({
    auth: {
      userId: clerkUserId,
    } as SignedInAuthObject,
    prisma,
  });

  type Input = inferProcedureInput<AppRouter["favorite"]["add"]>;

  const input: Input = {
    searchResultId: "123",
  };

  // first call should work
  const result = await caller.favorite.add(input);
  expect(result).toMatchObject({ searchResultId: "123", userId: "1" });

  // second call should error
  await expect(caller.favorite.add(input)).rejects.toThrow();
});
