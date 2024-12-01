import { createExpressMiddleware } from "@trpc/server/adapters/express"
import cors from "cors"
import express from "express"
import { makeAppRouter } from "src/backend/router"
import { metaHotTeardown } from "src/backend/utils/metaHotTeardown"
import { bootstrap } from "./bootstrap"

const main = async () => {
  const app = express()

  // Some cors settings to enable us to have a website hosted at :3000 calling backend at :4000 for example (cross domain)
  app.use(
    cors({
      origin: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    }),
  )

  // make the trpc appRouter - it handles all the requests
  const services = await bootstrap()
  const appRouter = await makeAppRouter(services)

  app.use(
    "/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext: () => ({}),
    }),
  )

  const port = 4000

  const server = app.listen(port, () => {
    console.log("server listening to port", port)
  })

  metaHotTeardown(() => server.close())
}
main()
