import { clerkClient, type SignedInAuthObject } from "@clerk/nextjs/api";
import { type inferProcedureInput } from "@trpc/server";
import { beforeEach, expect, test, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

import { type PrismaClient, type User } from "@homelizard/db";

import { appRouter, type AppRouter } from "../root";

// required for mocking clerkClient.users.getUser
vi.mock("@clerk/nextjs/api");
const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  vi.mocked(clerkClient.users.getUser).mockClear();
  mockReset(prismaMock);
});

test("user.register", async () => {
  type Input = inferProcedureInput<AppRouter["user"]["register"]>;
  const input: Input = {
    gender: "male",
    firstName: "John",
    lastName: "Wiliam",
  };

  const clerkUserId = "123";
  const clerkUserEmail = "john.william@example.com";

  const expectedResult: User = {
    id: "1",
    externalId: clerkUserId,
    email: clerkUserEmail,
    gender: input.gender,
    firstName: input.firstName,
    lastName: input.lastName,
    addressId: null,
    createdAt: new Date("2022/11/11"),
    updatedAt: new Date(),
  };

  prismaMock.user.create.mockResolvedValue(expectedResult);

  const clerkGetUserResponse = mockDeep<
    Awaited<ReturnType<typeof clerkClient.users.getUser>>
  >({
    primaryEmailAddressId: "1",
    emailAddresses: [
      {
        id: "2",
        emailAddress: "some.secondary@email.com",
      },
      {
        id: "1",
        emailAddress: clerkUserEmail,
      },
    ],
  });
  vi.mocked(clerkClient.users.getUser).mockResolvedValue(clerkGetUserResponse);

  const caller = appRouter.createCaller({
    auth: {
      userId: clerkUserId,
    } as SignedInAuthObject,
    prisma: prismaMock,
  });

  const result = await caller.user.register(input);
  expect(prismaMock.user.create).toHaveBeenCalledWith(
    expect.objectContaining({
      data: expect.objectContaining({
        externalId: clerkUserId,
        email: clerkUserEmail,
      }),
    }),
  );
  expect(result).toEqual(expectedResult);
});

test("user.update", async () => {
  type Input = inferProcedureInput<AppRouter["user"]["update"]>;
  const input: Input = {
    gender: "female",
    firstName: "Jane",
    lastName: "Cameroon",
  };

  const clerkUserId = "123";
  const clerkUserEmail = "john.william@example.com";

  const expectedResult: User = {
    id: "1",
    externalId: clerkUserId,
    email: clerkUserEmail,
    gender: "female",
    firstName: "Jane",
    lastName: "Cameroon",
    addressId: null,
    createdAt: new Date("2022/11/11"),
    updatedAt: new Date(),
  };

  prismaMock.user.update.mockResolvedValue(expectedResult);

  const caller = appRouter.createCaller({
    auth: {
      userId: clerkUserId,
    } as SignedInAuthObject,
    prisma: prismaMock,
  });
  const result = await caller.user.update(input);

  expect(result).toEqual(expectedResult);
});

test("user.userInfo", async () => {
  const clerkUserId = "123";
  const clerkUserEmail = "john.william@example.com";

  const expectedResult: User = {
    id: "1",
    externalId: clerkUserId,
    email: clerkUserEmail,
    gender: "male",
    firstName: "John",
    lastName: "Wiliam",
    addressId: null,
    createdAt: new Date("2022/11/01"),
    updatedAt: new Date(),
  };

  prismaMock.user.findUnique.mockResolvedValue(expectedResult);

  const caller = appRouter.createCaller({
    auth: {
      userId: clerkUserId,
    } as SignedInAuthObject,
    prisma: prismaMock,
  });
  const result = await caller.user.userInfo();

  expect(result).toEqual(expectedResult);
});
