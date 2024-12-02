import fs from "fs/promises"
import { DateTime } from "luxon"
import { afterEach } from "node:test"
import path from "path"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { DbUser } from "../domain/models/User"
import { runMigrations } from "../utils/migrationManager"
import { sql } from "../utils/sql"
import { makeSqliteConnection } from "../utils/sqliteConnection"
import { makeSqliteUserRepository } from "./SqliteUserRepository"

const dbDir = "./storage/userAdapterTest/"
const dbFile = "test.db"
const dbPath = path.join(dbDir, dbFile)

const makeConnection = () => {
  return makeSqliteConnection(dbPath)
}

describe("useradapter", () => {
  beforeAll(async () => {
    await fs.mkdir(dbDir, { recursive: true })
    const connection = makeConnection()
    await runMigrations(connection)
  })

  afterAll(async () => {
    // rm the db!
    await fs.rm(dbPath)
  })

  afterEach(async () => {
    const connection = makeConnection()
    // CLEANUP ALL USERS
    await connection.run(sql`DELETE FROM user;`)
  })

  test("saves and retrieves", async () => {
    const connection = makeConnection()
    const userAdapter = makeSqliteUserRepository(connection)
    const user = {
      id: "1",
      email: "esherrthan@gmail.com",
      name: "Ethan",
      passwordHash: "hash",
      birthday: DateTime.fromISO("1989-06-26"),
    } satisfies DbUser

    await userAdapter.saveUser(user)

    const [err, retrievedUser] = await userAdapter.getUser("1")
    if (err) throw err

    expect(retrievedUser).toEqual(user)
  })
})
