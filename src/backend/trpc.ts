import { initTRPC } from "@trpc/server"
import { Request, Response } from "express"
import superjson from "superjson"
import { User } from "./domain/models/User"

type Context = {
  user?: User
  req: Request
  res: Response
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure
