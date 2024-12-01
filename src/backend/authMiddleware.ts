import { TRPCError } from "@trpc/server"
import { UserService } from "./services/UserService"

export const authMiddleware = (userService: UserService) => {
  return async ({ ctx, next }: any) => {
    const token = ctx.headers.authorization?.split(" ")[1] // Extract token from "Bearer <token>"
    if (!token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No token provided",
      })
    }

    // TODO
    const [error, user] = await userService.authenticate(token)
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
      })
    }

    ctx.user = user // Attach user info to context
    return next() // Proceed to the actual resolver
  }
}
