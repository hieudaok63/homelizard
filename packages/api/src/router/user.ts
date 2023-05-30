import { clerkClient } from "@clerk/nextjs/api";
import { z } from "zod";

import { genderSchema } from "@homelizard/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  register: protectedProcedure
    .input(
      z.object({
        gender: genderSchema,
        firstName: z.string().min(1),
        lastName: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await clerkClient.users.getUser(ctx.auth.userId);

      const email = user.emailAddresses.find(
        (e) => e.id === user.primaryEmailAddressId,
      )?.emailAddress;

      if (!email) {
        throw new Error("No email address found");
      }

      return ctx.prisma.user.create({
        data: {
          externalId: ctx.auth.userId,
          email: email,
          ...input,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        gender: genderSchema.optional(),
        firstName: z.string().min(1).optional(),
        lastName: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { externalId: ctx.auth.userId },
        data: input,
      });
    }),

  userInfo: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { externalId: ctx.auth.userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }),
});
