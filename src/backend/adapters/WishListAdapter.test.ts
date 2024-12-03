import fs from "fs/promises"
import { DateTime } from "luxon"
import { afterEach } from "node:test"
import path from "path"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { DbWishItem } from "../domain/models/WishList"
import { runMigrations } from "../utils/migrationManager"
import { sql } from "../utils/sql.old"
import { makeSqliteConnection } from "../utils/sqliteConnection"
import { makeSqliteUserRepository } from "./SqliteUserRepository"
import { makeWishListStorageAdapter } from "./WishListAdapter"

const dbDir = "./store/wishListAdapterTest/"
const dbFile = "test.db"

const makeConnection = () => {
  return makeSqliteConnection(path.join(dbDir, dbFile))
}

describe("wla", () => {
  beforeAll(async () => {
    await fs.mkdir(dbDir, { recursive: true })
    const connection = makeSqliteConnection(path.join(dbDir, dbFile))
    await runMigrations(connection)

    const userAdapter = makeSqliteUserRepository(connection)
    userAdapter.saveUser({
      id: "1",
      email: "esherrthan@gmail.com",
      name: "Ethan",
      passwordHash: "hash",
      birthday: DateTime.now(),
    })
  })

  afterAll(async () => {
    await fs.rmdir(dbDir, { recursive: true })
  })

  afterEach(async () => {
    const connection = makeSqliteConnection(path.join(dbDir, dbFile))
    // do cleanup after every test
    await connection.run(sql`DELETE FROM WishItem;`)
    await connection.run(sql`DELETE FROM WishList;`)
  })

  test("insert and retrieve", async () => {
    const connection = makeConnection()
    const wishListADapter = makeWishListStorageAdapter(connection)

    const wl = {
      id: "1",
      description: "Cool",
      eventDate: DateTime.now().toISODate(),
      title: "Cool",
      userId: "1",
    }
    await wishListADapter.upsertDbWishList(wl)

    const [err, wishList] = await wishListADapter.getWishList("1")
    if (err) throw err

    expect(wishList).toEqual(wl)
  })

  test("insert and retrieve and insert again", async () => {
    const connection = makeConnection()
    const wishListADapter = makeWishListStorageAdapter(connection)

    const wl = {
      id: "1",
      description: "Cool",
      eventDate: DateTime.now().toISODate(),
      title: "Cool",
      userId: "1",
    }
    await wishListADapter.upsertDbWishList(wl)

    let [err, wishList] = await wishListADapter.getWishList("1")
    if (err) throw err

    expect(wishList).toEqual(wl)

    wl.description = "Foo"

    await wishListADapter.upsertDbWishList(wl)
    ;[err, wishList] = await wishListADapter.getWishList("1")
    if (err) throw err

    expect(wishList).toEqual(wl)
  })

  test("add items", async () => {
    const connection = makeConnection()
    const wishListADapter = makeWishListStorageAdapter(connection)

    const wl = {
      id: "1",
      description: "Cool",
      eventDate: DateTime.now().toISODate(),
      title: "Cool",
      userId: "1",
    }
    await wishListADapter.upsertDbWishList(wl)

    const wli = {
      id: "1",
      name: "hi",
      mostWanted: 1,
      imageUrl: null,
      link: null,
      notes: "get it for me",
      price: 23.22,
      quantity: 1,
      status: "open",
      wishListId: "1",
    } satisfies DbWishItem
    await wishListADapter.upsertWishItem(wli)

    const wlis = await wishListADapter.getWishItems("1")

    expect(wlis).toEqual([wli])
  })
})
