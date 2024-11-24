import { WishList } from "../components/WishList"
import { WishListType } from "src/types"
import { useParams } from "react-router-dom"
import { MenuBar } from "../components/MenuBar"

type WishListPageType = {
  wishListData?: WishListType
}
export const WishListPage = ({ wishListData }: WishListPageType) => {
  const { wishlistid } = useParams<{ wishlistid: string }>()
  console.log("Wish List ID: ", wishlistid)
  const testDate = new Date("11/01/2024")

  const testData = {
    listId: 123,
    listName: "My 30th birthday",
    listNotes: "balh blah",
    privacy: "public",
    items: [
      {
        name: "shoe",
        addedDate: testDate,
        link: "www.shoelink.com",
        price: 22.3,
        // color: "red",
        status: "open",
        notes: "Item desc",
        quantity: 1,
        image: "donot know yet",
        mostWanted: true,
      },
      {
        name: "cube box",
        addedDate: testDate,
        link: "",
        price: 22,
        // color: "red",
        status: "booked",
        notes: "any cube box is fine",
        quantity: 4,
        image: "donot know yet",
        mostWanted: false,
      },
    ],
  }

  return (
    <div>
      <MenuBar />
      To Display Wish List
      <WishList data={testData} />
    </div>
  )
}
