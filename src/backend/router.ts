import { z } from "zod"
import { authMiddleware } from "./authMiddleware"
import { upsertWishItemRequest } from "./domain/models/UpsertWishItem"
import { upsertWishListSchema } from "./domain/models/UpsertWishListInput"
import { UserService } from "./services/UserService"
import { WishListService } from "./services/WishListService"
import { publicProcedure, router } from "./trpc"
import { LuxonDateTimeSchema } from "./utils/LuxonDateTimeSchema"

export type MakeAppRouterParams = {
  userService: UserService
  wishListService: WishListService
}
export const makeAppRouter = ({
  userService,
  wishListService,
}: MakeAppRouterParams) => {
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

    getWishlist: publicProcedure
      .input(z.object({ wishListId: z.string() }))
      .query(async ({ input }) => {
        const [err, wishList] = await wishListService.getWishList(
          input.wishListId,
        )
        if (err) throw err
        return wishList
      }),

    getWishItems: publicProcedure
      .input(z.object({ wishListId: z.string() }))
      .query(async ({ input }) => {
        const [err, wishList] = await wishListService.getWishItems(
          input.wishListId,
        )
        if (err) throw err
        return wishList
      }),

    getMyWishLists: publicProcedure
      .use(authMiddleware(userService))
      .query(async ({ ctx: { user } }) => {
        const [err, wishLists] = await wishListService.getMyWishLists(user)
        if (err) throw err
        return wishLists
      }),

    upsertWishList: publicProcedure
      .use(authMiddleware(userService))
      .input(upsertWishListSchema)
      .mutation(async ({ input, ctx }) => {
        const [err] = await wishListService.upsertWishList(input, ctx.user)
        if (err) throw err
      }),

    upsertWishItem: publicProcedure
      .use(authMiddleware(userService))
      .input(upsertWishItemRequest)
      .mutation(async ({ input, ctx }) => {
        const [err] = await wishListService.upsertWishItem(input, ctx.user)
        if (err) throw err
      }),
  })
}

// Type inferred AppRouter is used by the frontend - so that we can define
// methods above and have auto-complete endpoints in the frontend.
export type AppRouter = Awaited<ReturnType<typeof makeAppRouter>>
