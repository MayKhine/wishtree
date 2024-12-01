export type WishListType = {
  listId: number
  listName: string
  listPrivacy: string
  listNotes: string
  listDate: Date
  listItems: Array<WishListItemType>
}

export type WishType = {
  listId: number
  listName: string
  listPrivacy: string
  listNotes: string
  listDate: Date
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

/*
-- wish list data 
[
{  listId: number
  listName: string
  listPrivacy: string
  listNotes: string
  listDate: Date}, {
  ......}
]

-- wish list items data 
[
  {
  wishListID: number
  wishes: [<wishlistitems>]
}
]

*/
