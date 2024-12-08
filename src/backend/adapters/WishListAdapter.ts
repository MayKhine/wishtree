import { WishItem, WishList } from "../domain/models/WishList"
import { WishListStoreAdapter } from "../services/WishListService"
import { sql } from "../utils/sql"
import { SqliteConnection } from "../utils/sqliteConnection"
import { ErrorType } from "../utils/tryCatch"

export const makeWishListStorageAdapter = (
  sqliteConnection: SqliteConnection,
): WishListStoreAdapter => {
  const upsertDbWishList = async (wishList: WishList) => {
    await sqliteConnection.run(sql`
      INSERT INTO WishList (id, title, description, eventDate, userId)
      VALUES (${wishList.id}, ${wishList.title}, ${wishList.description}, ${wishList.eventDate}, ${wishList.userId})
      ON CONFLICT(id) DO UPDATE SET
        title = ${wishList.title},
        description = ${wishList.description},
        eventDate = ${wishList.eventDate},
        userId = ${wishList.userId};
      `)
  }

  const getWishList = async (
    id: string,
  ): Promise<ErrorType<WishList, Error | "NotFound">> => {
    const [wishList] = await sqliteConnection.all<WishList>(sql`
      SELECT id, title, description, eventDate, userId 
      FROM WishList
      WHERE id = ${id};
    `)
    if (!wishList) {
      return ["NotFound", null]
    }
    return [null, wishList]
  }

  const getWishItems = async (wishListId: string) => {
    const items = await sqliteConnection.all<WishItem>(sql`
      SELECT id, name, notes, price, link, imageUrl, status, mostWanted, quantity, wishListId 
      FROM WishItem
      WHERE wishListId = ${wishListId};
    `)

    return items
  }

  const upsertWishItem = async ({
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
  }: WishItem) => {
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
    getWishItems,
    upsertWishItem,
  }
}
