import { DateTime } from "luxon"

export type WishList = {
  id: string
  title: string
  description: string
  eventDate: string | null
  userId: string
}

export type StatusType = "open" | "reserved" | "received"

export type WishItem = {
  id: string
  name: string
  notes: string
  price: number
  link: string | null
  imageUrl: string | null
  status: string
  mostWanted: boolean
  quantity: number
  wishListId: string
}
