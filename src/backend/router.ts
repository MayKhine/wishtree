import { z } from "zod"
import { authMiddleware } from "./authMiddleware"
import { UserService } from "./services/UserService"
import { publicProcedure, router } from "./trpc"

export type MakeAppRouterParams = {
  userService: UserService
}

export const makeAppRouter = ({ userService }: MakeAppRouterParams) => {
  return router({
    getWishlist: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async () => {
        return {}
      }),

    updateProfile: publicProcedure
      .use(authMiddleware(userService))
      .input(
        z.object({
          name: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        // Protected: Use ctx.user for updates
        return { message: `Profile updated for ${ctx.user.email}` }
      }),
  })
}

// Type inferred AppRouter is used by the frontend - so that we can define
// methods above and have auto-complete endpoints in the frontend.
export type AppRouter = Awaited<ReturnType<typeof makeAppRouter>>
