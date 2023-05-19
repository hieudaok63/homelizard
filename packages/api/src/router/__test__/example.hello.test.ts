import { type inferProcedureInput } from "@trpc/server";

import { prisma } from "@homelizard/db";

import { appRouter, type AppRouter } from "../../root";
import { signedOutAuthObject } from "@clerk/nextjs/api";
import { test, expect } from 'vitest'

test("hello test", async () => {
  const caller = appRouter.createCaller({ auth: signedOutAuthObject(), prisma: prisma });

  type Input = inferProcedureInput<AppRouter["example"]["hello"]>;

  const input: Input = {
    text: "world",
  };

  const result = await caller.example.hello(input);
  
  expect(result).toEqual({ greeting: "Hello world!" });
});
