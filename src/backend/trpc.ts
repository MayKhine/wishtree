import { initTRPC } from "@trpc/server"
import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import { User } from "./models/models"

type Context = {
  user?: User
} & CreateExpressContextOptions

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
