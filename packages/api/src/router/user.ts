import { clerkClient } from "@clerk/nextjs/api";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  register: protectedProcedure
    .input(
      z.object({
        gender: z.string(),
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
});
