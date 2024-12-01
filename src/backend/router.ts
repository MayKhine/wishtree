import { publicProcedure, router } from "./trpc"
import { z } from 'zod'

export const makeAppRouter = () => {
  return router({
    getWishlist: publicProcedure.input(z.object({ id: z.string() })).query(async () => {

      return {}
    }),
  })
}

// Type inferred AppRouter is used by the frontend - so that we can define
// methods above and have auto-complete endpoints in the frontend.
export type AppRouter = Awaited<ReturnType<typeof makeAppRouter>>