import { z } from "zod"
import { authMiddleware } from "./authMiddleware"
import { UserService } from "./services/UserService"
import { publicProcedure, router } from "./trpc"
import { LuxonDateTimeSchema } from "./utils/LuxonDateTimeSchema"

export type MakeAppRouterParams = {
  userService: UserService
}

export const makeAppRouter = ({ userService }: MakeAppRouterParams) => {
  return router({
    createUser: publicProcedure
      .input(
        z.object({
          name: z.string(),
          email: z.string(),
          birthday: LuxonDateTimeSchema.optional(),
          password: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const [error, token] = await userService.createUser(input)
        if (error) throw error

        ctx.res.cookie("auth-token", token, {
          httpOnly: true, // Prevent access via JavaScript
          secure: false, // Use HTTPS in production
          sameSite: "strict", // CSRF protection
          // maxAge: 7 * 24 * 60 * 60 * 1000, // tokens already have an expirey, that expirey should be expressed here.
        })

        return token
      }),
    loginUser: publicProcedure
      .input(
        z.object({
          email: z.string(),
          password: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const { email, password } = input
        const [err, token] = await userService.login(email, password)
        if (err) throw err

        ctx.res.cookie("auth-token", token, {
          httpOnly: true, // Prevent access via JavaScript
          secure: false, // Use HTTPS in production
          sameSite: "strict", // CSRF protection
          // maxAge: 7 * 24 * 60 * 60 * 1000, // tokens already have an expirey, that expirey should be expressed here.
        })

        return token
      }),
    helloWorld: publicProcedure.query(async () => ({
      hello: "world",
    })),

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
        return { message: `Profile updated for ${ctx.user?.email}` }
      }),
  })
}

// Type inferred AppRouter is used by the frontend - so that we can define
// methods above and have auto-complete endpoints in the frontend.
export type AppRouter = Awaited<ReturnType<typeof makeAppRouter>>
