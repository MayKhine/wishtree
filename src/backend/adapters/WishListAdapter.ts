import { WishItem, WishList } from "../domain/models/WishList"
import { WishListStoreAdapter } from "../services/WishListService"
import { sql } from "../utils/sql"
import { SqliteConnection } from "../utils/sqliteConnection"
import { ErrorType } from "../utils/tryCatch"

export const makeWishListStorageAdapter = (
  sqliteConnection: SqliteConnection,
): WishListStoreAdapter => {
  const upsertDbWishList = async (wishList: WishList) => {
    const { id, title, description, eventDate, userId } = toDbWishList(wishList)

    await sqliteConnection.run(sql`
      INSERT INTO WishList (id, title, description, eventDate, userId)
      VALUES (${id}, ${title}, ${description}, ${eventDate}, ${userId})
      ON CONFLICT(id) DO UPDATE SET
        title = ${title},
        description = ${description},
        eventDate = ${eventDate},
        userId = ${userId};
      `)
  }

  const getWishList = async (
    id: string,
  ): Promise<ErrorType<WishList, Error | "NotFound">> => {
    const [dbWishList] = await sqliteConnection.all<DBWishList>(sql`
      SELECT id, title, description, eventDate, userId 
      FROM WishList
      WHERE id = ${id};
    `)
    if (!dbWishList) {
      return ["NotFound", null]
    }
    return [null, fromDbWishList(dbWishList)]
  }

  const getWishListsByUserId = async (userId: string) => {
    const items = await sqliteConnection.all<DBWishList>(sql`
      SELECT id, title, description, eventDate, userId 
      FROM WishList
      WHERE userId = ${userId}
    `)
    return items.map(fromDbWishList)
  }

  const getWishItems = async (wishListId: string) => {
    const items = await sqliteConnection.all<DBWishItem>(sql`
      SELECT id, name, notes, price, link, imageUrl, status, mostWanted, quantity, wishListId 
      FROM WishItem
      WHERE wishListId = ${wishListId};
    `)

    return items.map(fromDbWishItem)
  }

  const upsertWishItem = async (wishItem: WishItem) => {
    const {
      id,
      name,
      notes,
      price,
      link,
      imageUrl,
      status,
      mostWanted,
      quantity,
      wishListId,
    } = toDbWishItem(wishItem)

    await sqliteConnection.run(sql`
      INSERT INTO WishItem (id, name, notes, price, link, imageUrl, status, mostWanted, quantity, wishListId)
      VALUES (${id}, ${name}, ${notes}, ${price}, ${link}, ${imageUrl}, ${status}, ${mostWanted}, ${quantity}, ${wishListId})
      ON CONFLICT(id) DO UPDATE SET
        name = ${name},
        notes = ${notes},
        price = ${price},
        link = ${link},
        imageUrl = ${imageUrl},
        status = ${status},
        mostWanted = ${mostWanted},
        quantity = ${quantity},
        wishListId = ${wishListId}
      `)
  }

  return {
    upsertDbWishList,
    getWishList,
    // broken types fixed on may branch
    getWishItems: getWishItems as any,
    getWishListsByUserId: getWishListsByUserId as any,
    upsertWishItem,
  }
}

// DBWishList transforms
type DBWishList = Omit<WishList, "eventDate"> & {
  eventDate: string | null
}

const toDbWishList = (wishList: WishList): DBWishList => {
  return {
    ...wishList,
    eventDate: wishList.eventDate ?? null,
  }
}

const fromDbWishList = (dbWishList: DBWishList): WishList => {
  return {
    ...dbWishList,
  }
}

// DBWIshItem transforms
type DBWishItem = Omit<
  WishItem,
  "mostWanted" | "price" | "imageUrl" | "link"
> & {
  mostWanted: number
  price: number | null
  imageUrl: string | null
  link: string | null
}

const toDbWishItem = (wishItem: WishItem): DBWishItem => {
  return {
    ...wishItem,
    price: wishItem.price ?? null,
    imageUrl: wishItem.imageUrl ?? null,
    link: wishItem.link ?? null,
    mostWanted: wishItem.mostWanted ? 1 : 0,
  }
}

const fromDbWishItem = (dbWishItem: DBWishItem): WishItem => {
  return {
    ...dbWishItem,
    mostWanted: Boolean(dbWishItem.mostWanted),
  }
}
