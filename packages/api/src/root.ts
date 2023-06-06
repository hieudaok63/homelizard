import { authRouter } from "./router/auth";
import { exampleRouter } from "./router/example";
import { postRouter } from "./router/post";
import { profileRouter } from "./router/profile";
import { searchRouter } from "./router/search";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  example: exampleRouter,
  profile: profileRouter,
  user: userRouter,
  search: searchRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
