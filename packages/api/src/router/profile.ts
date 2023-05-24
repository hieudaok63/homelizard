import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;

const client = new S3Client({
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
});
