import { objectStyles } from "@homelizard/schema";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const objectStyleRouter = createTRPCRouter({
  all: publicProcedure.query(() => objectStyles),
});
