import { Duration } from "luxon"
import { makeAuthAdapter } from "./adapters/AuthAdapter"
import { makeJwtMinterAdapter } from "./adapters/JwtMinterAdapter"
import { makeSqliteUserRepository } from "./adapters/SqliteUserRepository"
import { makeUserService } from "./services/UserService"
import { runMigrations } from "./utils/migrationManager"
import { makeSqliteConnection } from "./utils/sqliteConnection"

export const bootstrap = async () => {
  const db = makeSqliteConnection("./storage/db.sqlite")
  await runMigrations(db)

  const secretService = makeFileSecretService("./storage/secret")

  const userRepository = makeSqliteUserRepository(db)
  const authAdapter = makeAuthAdapter()
  const jwtMinter = makeJwtMinterAdapter({
    secretService,
    expiresIn: Duration.fromObject({ weeks: 1 }).seconds,
  })
  const userService = makeUserService(userRepository, authAdapter, jwtMinter)
}
