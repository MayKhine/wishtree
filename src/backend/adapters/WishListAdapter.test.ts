import fs from "fs/promises"
import { DateTime } from "luxon"
import { afterEach } from "node:test"
import path from "path"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { WishItem } from "../domain/models/WishList"
import { runMigrations } from "../utils/migrationManager"
import { sql } from "../utils/sql"
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

  test.only("add items", async () => {
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
      mostWanted: true,
      imageUrl: null,
      link: null,
      notes: "get it for me",
      price: 23.22,
      quantity: 1,
      status: "open",
      wishListId: "1",
    } satisfies WishItem
    await wishListADapter.upsertWishItem(wli)

    const wlis = await wishListADapter.getWishItems("1")

    expect(wlis).toEqual([null, [wli]])
  })

  test("delete item", async () => {
    const connection = makeConnection()
    const wishListADapter = makeWishListStorageAdapter(connection)

    await wishListADapter.upsertDbWishList({
      id: "12listid",
      title: "test wish list",
      description: "",
      userId: "12user",
    })

    await wishListADapter.upsertWishItem({
      id: "12itemid",
      name: "shoe",
      notes: "blah ",
      mostWanted: true,
      quantity: 1,
      price: 2,
      status: "open",
      wishListId: "12listid",
    })

    const itemResult = await wishListADapter.getWishItem("12itemid")

    expect(itemResult).toEqual([
      null,
      {
        id: "12itemid",
        name: "shoe",
        notes: "blah ",
        mostWanted: true,
        quantity: 1,
        price: 2,
        status: "open",
        wishListId: "12listid",
        imageUrl: null,
        link: null,
      },
    ])

    await wishListADapter.deleteWishItem("12itemid")

    const itemResult2 = await wishListADapter.getWishItem("12itemid")

    expect(itemResult2).toEqual(["NotFound", null])
  })
})
