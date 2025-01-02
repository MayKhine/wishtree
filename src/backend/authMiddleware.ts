// import { TRPCError } from "@trpc/server"
import { UserService } from "./services/UserService"
// import { User } from "./models/models"
import { DateTime } from "luxon"

export const authMiddleware = (userService: UserService) => {
  return async ({ ctx, next }: any) => {
    // get the token from authorization: "Bearer <token>"
    // const token = ctx.req.cookies["auth-token"] // Read the token from the cookie

    // if (!token) {
    //   throw new TRPCError({
    //     code: "UNAUTHORIZED",
    //     message: "No token provided",
    //   })
    // }

    // const [error, user] = await userService.authenticate(token)
    // if (error) {
    //   console.error("Unable to authenticate: ", error)
    //   throw new TRPCError({
    //     code: "UNAUTHORIZED",
    //     message: "Invalid or expired token",
    //   })
    // }

    ctx.user = {
      birthday: DateTime.now(),
      id: "qwert",
      name: "test",
      email: "builtbymay@gmail.com",
    }
    return next()
  }
}
