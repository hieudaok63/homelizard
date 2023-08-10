import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";

import { type File } from "@homelizard/db";
import { fileTypeOptions, fileTypeSchema } from "@homelizard/schema";

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constant/paginated.constant";
import { getPaginatedItems } from "../helpers/pagination.helper";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;

const client = new S3Client({
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  },
  region: "eu-central-1",
});

const fileExists = async (key: string) => {
  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: "homelizard-dev",
        Key: key,
      }),
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const profileRouter = createTRPCRouter({
  signedProfileImageUrl: protectedProcedure.query(async ({ ctx }) => {
    const profileImageKey = `profile/${ctx.auth.userId}.jpg`;

    if (!(await fileExists(profileImageKey))) {
      return {
        url: null,
      };
    }

    const command = new GetObjectCommand({
      Bucket: "homelizard-dev",
      Key: profileImageKey,
    });
    const url = await getSignedUrl(client, command);
    return {
      url,
    };
  }),
  signUploadUrl: protectedProcedure
    .input(
      z.object({
        fileSize: z.number().max(MAX_UPLOAD_SIZE),
      }),
    )
    .query(async ({ ctx, input }) => {
      const command = new PutObjectCommand({
        Bucket: "homelizard-dev",
        Key: `profile/${ctx.auth.userId}.jpg`,
        ContentType: "image/jpeg",
        ContentLength: input.fileSize,
      });
      const url = await getSignedUrl(client, command);
      return {
        url,
      };
    }),
  signUploadFileUrl: protectedProcedure
    .input(
      z.object({
        fileSize: z.number().max(MAX_UPLOAD_SIZE),
        blobName: z.string().min(1),
        fileType: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const fileKey = `file/${ctx.auth.userId}/${input.blobName}`;
      const command = new PutObjectCommand({
        Bucket: "homelizard-dev",
        Key: fileKey,
        ContentType: input.fileType,
        ContentLength: input.fileSize,
      });

      const url = await getSignedUrl(client, command);
      return {
        url,
      };
    }),
  signedFileUrl: protectedProcedure
    .input(z.object({ blobName: z.string().min(1), fileType: fileTypeSchema }))
    .query(async ({ ctx, input }) => {
      const fileKey = `file/${ctx.auth.userId}/${input.blobName}`;
      if (!(await fileExists(fileKey))) {
        return {
          url: null,
        };
      }
      const command = new GetObjectCommand({
        Bucket: "homelizard-dev",
        Key: fileKey,
      });
      const url = await getSignedUrl(client, command);

      const user = await ctx.prisma.user.findUnique({
        where: { externalId: ctx.auth.userId },
      });
      const file = await ctx.prisma.file.findFirst({
        where: { userId: user?.id, blobName: input.blobName },
      });
      if (!file) {
        await ctx.prisma.file.create({
          data: {
            cvType: "upload",
            fileType: input.fileType,
            blobName: input.blobName,
            url,
            user: { connect: { id: user?.id } },
          },
        });
      } else {
        await ctx.prisma.file.update({
          where: { id: file.id },
          data: {
            url,
          },
        });
      }
      return {
        url,
      };
    }),

  removeFile: protectedProcedure
    .input(
      z.object({
        fileId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { externalId: ctx.auth.userId },
      });
      if (!user) {
        throw new Error(`User not found`);
      }
      const userOwnFile = await ctx.prisma.file.findFirst({
        where: { id: input.fileId, userId: user.id },
      });
      if (!userOwnFile) {
        throw new Error(`You can only remove your own file`);
      }
      const fileDeleted = await ctx.prisma.file.delete({
        where: { id: input.fileId },
      });

      if (userOwnFile.cvType !== "link") {
        const fileKey = `file/${ctx.auth.userId}/${userOwnFile.blobName}`;
        const command = new DeleteObjectCommand({
          Bucket: "homelizard-dev",
          Key: fileKey,
        });

        const url = await getSignedUrl(client, command);
        return {
          fileDeleted,
          url,
        };
      }

      return {
        fileDeleted,
        url: null,
      };
    }),
  addCVByLink: protectedProcedure
    .input(
      z.object({
        link: z.string().url(),
        blobName: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { externalId: ctx.auth.userId },
      });
      return ctx.prisma.file.create({
        data: {
          cvType: "link",
          url: input.link,
          blobName: input.blobName,
          fileType: fileTypeOptions[0],
          user: { connect: { id: user?.id } },
        },
      });
    }),
  listProfileCV: protectedProcedure
    .input(
      z.object({
        page: z.number().positive().optional(),
        limit: z.number().positive().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { externalId: ctx.auth.userId },
      });

      if (!user) {
        throw new Error(`User not found`);
      }
      const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = input;
      const [curriculumVitae, totalItems] = await Promise.all([
        ctx.prisma.file.findMany({
          where: { userId: user.id, fileType: fileTypeOptions[0] },
          orderBy: {
            createdAt: "desc",
          },
          skip: (page - 1) * limit,
          take: limit,
        }),
        ctx.prisma.file.count({
          where: { userId: user.id },
        }),
      ]);
      return getPaginatedItems<File>(curriculumVitae, page, limit, totalItems);
    }),
});
