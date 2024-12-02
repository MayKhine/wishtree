import fs from "fs/promises"
import { Duration } from "luxon"
import { makeAuthAdapter } from "./adapters/AuthAdapter"
import { makeJwtMinterAdapter } from "./adapters/JwtMinterAdapter"
import { makeSecretFileAdapter } from "./adapters/SecretFileAdapter"
import { makeSqliteUserRepository } from "./adapters/SqliteUserRepository"
import { makeWishListStorageAdapter } from "./adapters/WishListAdapter"
import { makeUserService } from "./services/UserService"
import { makeWishListService } from "./services/WishListService"
import { makeFileStorageHelper } from "./utils/fileStorageHelper"
import { runMigrations } from "./utils/migrationManager"
import { makeSqliteConnection } from "./utils/sqliteConnection"

export const bootstrap = async () => {
  const storageDir = "./storage"

  await fs.mkdir(storageDir, { recursive: true })
  const db = makeSqliteConnection("./storage/db.sqlite")
  await runMigrations(db)

  const fileHelper = makeFileStorageHelper("./storage")
  await fileHelper.init()
  const secretAdapter = makeSecretFileAdapter(fileHelper)

  const userRepository = makeSqliteUserRepository(db)
  const authAdapter = makeAuthAdapter()
  const jwtMinter = makeJwtMinterAdapter({
    expiresInSeconds: Duration.fromObject({ weeks: 1 }).seconds,
  })

  const userService = makeUserService(
    userRepository,
    authAdapter,
    jwtMinter,
    secretAdapter,
  )

  const wishListStore = makeWishListStorageAdapter(db)
  const wishListService = makeWishListService(wishListStore)

  return { userService, wishListService }
}
