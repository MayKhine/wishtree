import { MenuBar } from "../components/MenuBar"
import { CreateWishList } from "../components/CreateWishList"
import { WishList } from "../components/WishList"
import * as stylex from "@stylexjs/stylex"
import { CreateWishListButton } from "../components/CreateWishListButton"
import { useState } from "react"
export const HomePage = () => {
  const testDate = new Date("11/01/2024")
  const testData = {
    listId: 123,
    listName: "My 30th birthday",
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
  const [openCreateWishList, setOpenCreateWishList] = useState<boolean>(false)
  return (
    <div {...stylex.props(styles.base)}>
      <MenuBar />
      This is home page
      <CreateWishListButton
        onClickFn={() => {
          setOpenCreateWishList(true)
        }}
      />
      {openCreateWishList && (
        <CreateWishList
          onCancelFn={() => {
            setOpenCreateWishList(!openCreateWishList)
          }}
          onCreateFn={() => {
            console.log("Create a new wish list please!")
            setOpenCreateWishList(!openCreateWishList)
          }}
        />
      )}
    </div>
  )
}

const styles = stylex.create({
  base: { backgroundColor: "#DDDDDD" },
})
