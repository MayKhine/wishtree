import { initTRPC } from "@trpc/server"
import { Request, Response } from "express"
import { User } from "./models/models"

type Context = {
  user?: User
  req: Request
  res: Response
}

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
