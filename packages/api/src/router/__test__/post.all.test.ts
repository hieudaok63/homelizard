import { type SignedInAuthObject } from "@clerk/nextjs/api";
import { mockDeep } from "vitest-mock-extended";

import { type Post, type PrismaClient } from "@homelizard/db";

import { appRouter } from "../../root";
import { test, expect } from 'vitest'

test("getAll", async () => {
  const prismaMock = mockDeep<PrismaClient>();
  const mockOutput: Post[] = [
    {
      id: "1",
      title: "title",
      content: "content",
    },
  ];

  prismaMock.post.findMany.mockResolvedValue(mockOutput);

  const caller = appRouter.createCaller({
    auth: {
      userId: "123",
    } as SignedInAuthObject,
    prisma: prismaMock,
  });

  const result = await caller.post.all();

  expect(result).toHaveLength(1);
  expect(result).toStrictEqual(mockOutput);
});
