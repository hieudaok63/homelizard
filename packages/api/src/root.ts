import { authRouter } from "./router/auth";
import { exampleRouter } from "./router/example";
import { favoriteRoute } from "./router/favorite";
import { objectStyleRouter } from "./router/objectStyle";
import { postRouter } from "./router/post";
import { profileRouter } from "./router/profile";
import { requestRouter } from "./router/requestObject";
import { searchRouter } from "./router/search";
import { searchResultRouter } from "./router/searchResult";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  example: exampleRouter,
  profile: profileRouter,
  user: userRouter,
  search: searchRouter,
  favorite: favoriteRoute,
  searchResult: searchResultRouter,
  objectStyle: objectStyleRouter,
  request: requestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;