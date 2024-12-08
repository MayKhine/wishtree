import { WishItemStatus } from "./WishItemStatus"

export type WishList = {
  id: string
  title: string
  description: string
  eventDate?: string | null
  userId: string
}

export type WishItem = {
  id: string
  name: string
  notes: string
  price?: number | null
  link?: string | null
  imageUrl?: string | null
  status: WishItemStatus
  mostWanted: boolean
  quantity: number
  wishListId: string
}
