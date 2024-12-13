import { UpsertWishItemRequest } from "../domain/models/UpsertWishItem"
import { UpsertWishListRequest } from "../domain/models/UpsertWishListInput"
import { User } from "../domain/models/User"
import { WishItem, WishList } from "../domain/models/WishList"
import { ErrorType } from "../utils/tryCatch"

export const makeWishListService = (wishListStore: WishListStoreAdapter) => {
  const getMyWishLists = async (
    user: User | undefined,
  ): Promise<ErrorType<WishList[], Error | "NoUser">> => {
    if (!user) {
      return ["NoUser", null] as const
    }
    const [storeErr, wishLists] = await wishListStore.getWishListsByUserId(
      user.id,
    )
    if (storeErr) {
      return [storeErr, null] as const
    }
    return [null, wishLists] as const
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

  const deleteWishItem = async (
    wishItemId: string,
    maybeUser: User | undefined,
  ) => {
    const [error, wishItem] = await wishListStore.getWishItem(wishItemId)
    if (error) {
      return [error, null] as const
    }

    const [belongToUserErr] = await wishListBelongsToUser(
      wishItem.wishListId,
      maybeUser,
    )
    if (belongToUserErr) return [belongToUserErr, null] as const

    await wishListStore.deleteWishItem(wishItemId)

    return [null, undefined]
  }

  return {
    getMyWishLists,
    getWishItems: wishListStore.getWishItems,
    getWishList: wishListStore.getWishList,
    upsertWishList,
    upsertWishItem,
    deleteWishItem,
  }
}

export type WishListService = ReturnType<typeof makeWishListService>

export type WishListStoreAdapter = {
  upsertDbWishList: (wishList: WishList) => Promise<void>
  upsertWishItem: (wishItem: WishItem) => Promise<void>
  getWishList: (id: string) => Promise<ErrorType<WishList, Error | "NotFound">>
  getWishItems: (
    wishListId: string,
  ) => Promise<ErrorType<Array<WishItem>, Error>>
  getWishListsByUserId: (
    userId: string,
  ) => Promise<ErrorType<Array<WishList>, Error>>
  getWishItem: (
    wishItemId: string,
  ) => Promise<ErrorType<WishItem, Error | "NotFound">>
  deleteWishItem: (withItemId: string) => Promise<void>
}
