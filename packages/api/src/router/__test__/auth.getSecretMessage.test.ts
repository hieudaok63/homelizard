import {
  signedOutAuthObject,
  type SignedInAuthObject,
} from "@clerk/nextjs/api";

import { prisma } from "@homelizard/db";

import { appRouter } from "../../root";
import { test, expect } from 'vitest'

test("getSecretMessage", async () => {
  const caller = appRouter.createCaller({
    auth: {
      userId: "123",
    } as SignedInAuthObject,
    prisma: prisma,
  });

  const result = await caller.auth.getSecretMessage();

  expect(result).toEqual("you can see this secret message!");
});

test("getSecretMessage throws UnauthorizedError", async () => {
  const caller = appRouter.createCaller({
    auth: signedOutAuthObject(),
    prisma: prisma,
  });

  await expect(caller.auth.getSecretMessage()).rejects.toThrow(
    "Not authenticated",
  );
});
