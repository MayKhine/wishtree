import { DateTime } from "luxon"

export type User = {
  id: string,
  name: string,
  email: string,
  birthday: DateTime
}

export type WishList = {
  id: string
  title: string
  description: string
  eventDate: DateTime
}

export type WishItem = {
  id: string
  name: string
  notes: string
  // Cost as a number?
  price: number 
  link: string
  imageUrl: string
  status: 'open' | 'reserved' | 'received'
  mostWanted: boolean
  quantity: number
}

