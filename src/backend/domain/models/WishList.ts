import { DateTime } from "luxon"

export type DbWishList = {
  id: string
  title: string
  description: string
  eventDate: string | null
  userId: string
}

export type StatusType = "open" | "reserved" | "received"

export type DbWishItem = {
  id: string
  name: string
  notes: string
  price: number
  link: string | null
  imageUrl: string | null
  status: string
  mostWanted: number
  quantity: number
  wishListId: string
}
