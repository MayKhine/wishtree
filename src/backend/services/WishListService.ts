import { DbWishItem, DbWishList } from "../domain/models/WishList"
import { ErrorType } from "../utils/tryCatch"

export const makeWishListService = (wishListStore: WishListStoreAdapter) => {
  return {
    ...wishListStore,
  }
}

export type WishListService = ReturnType<typeof makeWishListService>

export type WishListStoreAdapter = {
  upsertDbWishList: (wishList: DbWishList) => Promise<void>
  upsertWishItem: (wishItem: DbWishItem) => Promise<void>
  getWishList: (
    id: string,
  ) => Promise<ErrorType<DbWishList, Error | "NotFound">>
  getWishItems: (wishListId: string) => Promise<DbWishItem[]>
}
