export type WishListType = {
  listId: number
  listName: string
  items: Array<WishListItemType>
}

export type WishListItemType = {
  name: string
  addedDate: Date
  link: string
  price: number
  // color: string
  status: string
  // status: "open" | "booked" | "received"
  notes: string
  quantity: number
  image: string
  mostWanted: boolean
}
