import { UpsertWishItemRequest } from "../domain/models/UpsertWishItem"
import { UpsertWishListRequest } from "../domain/models/UpsertWishListInput"
import { WishItem, WishList } from "../domain/models/WishList"
import { User } from "../models/models"
import { ErrorType } from "../utils/tryCatch"

export const makeWishListService = (wishListStore: WishListStoreAdapter) => {
  const wishListBelongsToUser = async (wishListId: string, user: User) => {
    const [err, wishList] = await wishListStore.getWishList(wishListId)
    if (err && err !== "NotFound") {
      return [err, null] as const
    }

    const wishListBelongsToUser = wishList && wishList.userId === user.id
    const wishListIsBeingCreated = err === "NotFound"

    if (!wishListBelongsToUser && !wishListIsBeingCreated) {
      return [null, false] as const
    }

    return [null, true] as const
  }

  const upsertWishList = async (
    upsertRequest: UpsertWishListRequest,
    user: User | undefined,
  ) => {
    if (!user) {
      return ["NoUser", null] as const
    }

    const [belongToUserErr, belongToUser] = await wishListBelongsToUser(
      upsertRequest.id,
      user,
    )
    if (belongToUserErr) return [belongToUserErr, null] as const
    if (!belongToUser) return ["Forbidden", null] as const

    // save
    await wishListStore.upsertDbWishList({
      ...upsertRequest,
      eventDate: upsertRequest.eventDate?.toISODate() ?? null,
      userId: user.id,
    })

    return [null, undefined] as const
  }

  const upsertWishItem = async (
    upsertRequest: UpsertWishItemRequest,
    user: User | undefined,
  ) => {
    if (!user) {
      return ["NoUser", null] as const
    }

    const [belongToUserErr, belongTouser] = await wishListBelongsToUser(
      upsertRequest.id,
      user,
    )
    if (belongToUserErr) return [belongToUserErr, null] as const
    if (!belongTouser) return ["Forbidden", null] as const

    // save
    await wishListStore.upsertWishItem({
      ...upsertRequest,
    })

    return [null, undefined] as const
  }

  return {
    getWishItems: wishListStore.getWishItems,
    getWishList: wishListStore.getWishList,
    upsertWishList,
    upsertWishItem,
  }
}

export type WishListService = ReturnType<typeof makeWishListService>

export type WishListStoreAdapter = {
  upsertDbWishList: (wishList: WishList) => Promise<void>
  upsertWishItem: (wishItem: WishItem) => Promise<void>
  getWishList: (id: string) => Promise<ErrorType<WishList, Error | "NotFound">>
  getWishItems: (wishListId: string) => Promise<WishItem[]>
}
