import { clerkClient } from "@clerk/nextjs/api";
import { z } from "zod";

import { genderSchema } from "@homelizard/schema";

import { MOBILE_PHONE_REGEX } from "../constant/base.constant";
import { EmailNotFound, UserNotFound } from "../exceptions/errors";
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
        throw new EmailNotFound();
      }

      const newUser = await ctx.prisma.user.create({
        data: {
          externalId: ctx.auth.userId,
          email: email,
          ...input,
        },
      });

      await ctx.prisma.customer.create({
        data: {
          users: {
            connect: {
              id: newUser.id,
            },
          },
        },
      });

      return newUser;
    }),

  update: protectedProcedure
    .input(
      z.object({
        gender: genderSchema.optional(),
        firstName: z.string().min(1).optional(),
        lastName: z.string().min(1).optional(),
        middleName: z.string().min(1).optional(),
        suffix: z.string().min(1).optional(),
        title: z.string().min(1).optional(),
        birthday: z.date().optional(),
        mobilePhone: z.string().regex(MOBILE_PHONE_REGEX).optional(),
        website: z.string().min(1).optional(),
        address: z
          .object({
            street: z.string(),
            city: z.string(),
            zipCode: z.string(),
            country: z.string(),
          })
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { externalId: ctx.auth.userId },
      });

      return ctx.prisma.user.update({
        where: { externalId: ctx.auth.userId },
        data: {
          ...input,
          address: input.address
            ? user?.addressId
              ? { update: input.address }
              : { create: input.address }
            : undefined,
        },
      });
    }),
  editPlaceOfWork: protectedProcedure
    .input(
      z.object({
        position: z.string(),
        company: z.string(),
        since: z.date(),
        phone: z.string().regex(MOBILE_PHONE_REGEX),
        email: z.string().email(),
        web: z.string(),
        address: z.object({
          street: z.string(),
          city: z.string(),
          zipCode: z.string(),
          country: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { externalId: ctx.auth.userId },
      });

      if (!user?.placeOfWorkId) {
        const newPlaceOfWork = await ctx.prisma.user.update({
          where: { id: user?.id },
          data: {
            placeOfWork: {
              create: {
                ...input,
                address: input.address ? { create: input.address } : undefined,
              },
            },
          },
        });

        return newPlaceOfWork;
      }
      return ctx.prisma.placeOfWork.update({
        where: { id: user?.placeOfWorkId },
        data: {
          ...input,
          address: { update: input.address },
        },
      });
    }),

  userInfo: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { externalId: ctx.auth.userId },
      include: {
        placeOfWork: true,
        address: true,
      },
    });

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }),
});
