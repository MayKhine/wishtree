import { TRPCError } from "@trpc/server"
import { UserService } from "./services/UserService"

export const authMiddleware = (userService: UserService) => {
  return async ({ ctx, next }: any) => {
    // get the token from authorization: "Bearer <token>"
    const token: string | null | undefined = ctx.req.cookies["auth-token"] // Read the token from the cookie
    console.log("Auth mid : ", token)

    // if (!token) {
    //   throw new TRPCError({
    //     code: "UNAUTHORIZED",
    //     message: "No token provided",
    //   })
    // }

    if (!token) {
      return next()
    }

    const [error, user] = await userService.authenticate(token)
    if (error) {
      console.error("Unable to authenticate: ", error)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
      })
    }

    ctx.user = user
    console.log("Auth mid- user: ", user)

    // ctx.user = {
    //   birthday: DateTime.now(),
    //   id: "qwert",
    //   name: "test",
    //   email: "builtbymay@gmail.com",
    // }
    return next()
  }
}
