import { UpsertWishItemRequest } from "../domain/models/UpsertWishItem"
import { UpsertWishListRequest } from "../domain/models/UpsertWishListInput"
import { User } from "../domain/models/User"
import { WishItem, WishList } from "../domain/models/WishList"
import { ErrorType } from "../utils/tryCatch"

export const makeWishListService = (wishListStore: WishListStoreAdapter) => {
  const getMyWishLists = async (user: User | undefined) => {
    if (!user) {
      return ["NoUser", null] as const
    }
    return await wishListStore.getWishListsByUserId(user.id)
  }

  const wishListBelongsToUser = async (
    wishListId: string,
    user: User | undefined,
  ) => {
    if (!user) {
      return ["NoUser", null] as const
    }

    const [err, wishList] = await wishListStore.getWishList(wishListId)
    if (err && err !== "NotFound") {
      return [err, null] as const
    }

    const wishListBelongsToUser = wishList && wishList.userId === user.id
    const wishListIsBeingCreated = err === "NotFound"

    if (!wishListBelongsToUser && !wishListIsBeingCreated) {
      return ["Forbidden", null] as const
    }

    return [null, user] as const
  }

  const upsertWishList = async (
    upsertRequest: UpsertWishListRequest,
    maybeUser: User | undefined,
  ) => {
    const [belongToUserErr, belongToUser] = await wishListBelongsToUser(
      upsertRequest.id,
      maybeUser,
    )
    if (belongToUserErr) return [belongToUserErr, null] as const

    // save
    await wishListStore.upsertDbWishList({
      ...upsertRequest,
      eventDate: upsertRequest.eventDate?.toISODate() ?? null,
      userId: belongToUser.id,
    })

    return [null, undefined] as const
  }

  const upsertWishItem = async (
    upsertRequest: UpsertWishItemRequest,
    maybeUser: User | undefined,
  ) => {
    const [belongToUserErr] = await wishListBelongsToUser(
      upsertRequest.id,
      maybeUser,
    )
    if (belongToUserErr) return [belongToUserErr, null] as const

    // save
    await wishListStore.upsertWishItem({
      ...upsertRequest,
      status: "open",
    })

    return [null, undefined] as const
  }

  return {
    getMyWishLists,
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
  getWishItems: (wishListId: string) => Promise<Array<WishItem>>
  getWishListsByUserId: (userId: string) => Promise<Array<WishList>>
}
