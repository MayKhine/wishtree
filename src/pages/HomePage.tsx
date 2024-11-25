import { MenuBar } from "../assets/MenuBar"
import { CreateWishList } from "../components/createWishListForm/CreateWishList"
import { WishList } from "../components/wishList/WishList"
import * as stylex from "@stylexjs/stylex"
import { CreateWishListButton } from "../components/createWishListForm/CreateWishListButton"
import { useState } from "react"
import { WishListType } from "src/types"
import { Wish } from "../components/wishes/Wish"
export const HomePage = () => {
  // const testDate = new Date("11/01/2024")
  // // const testData = {
  //   listId: 123,
  //   listName: "My 30th birthday",
  //   listPrivacy: "private",
  //   listNotes: "no  notes",
  //   listDate: testDate,
  //   listItems: [
  //     {
  //       name: "shoe",
  //       addedDate: testDate,
  //       link: "www.shoelink.com",
  //       price: 22.3,
  //       // color: "red",
  //       status: "open",
  //       notes: "Item desc",
  //       quantity: 1,
  //       image: "donot know yet",
  //       mostWanted: true,
  //     },
  //     {
  //       name: "cube box",
  //       addedDate: testDate,
  //       link: "",
  //       price: 22,
  //       // color: "red",
  //       status: "booked",
  //       notes: "any cube box is fine",
  //       quantity: 4,
  //       image: "donot know yet",
  //       mostWanted: false,
  //     },
  //   ],
  // // }
  const [openCreateWishList, setOpenCreateWishList] = useState<boolean>(false)
  const [wishList, setWishList] = useState<WishListType>()

  const createWishListHandler = (data: WishListType) => {
    setOpenCreateWishList(!openCreateWishList)
    console.log("Home: What is in wish list: ", data)
    localStorage.setItem("wishlist", JSON.stringify(data))
  }

  const getDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("wishlist")
    return storedData ? JSON.parse(storedData) : []
  }
  // localStorage.clear()

  const dataFromLocalStorage = getDataFromLocalStorage()
  console.log("Local data: ", dataFromLocalStorage)

  return (
    <div {...stylex.props(styles.base)}>
      <MenuBar />
      <div>
        {" "}
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
            onCreateFn={createWishListHandler}
          />
        )}
      </div>
      <div>
        If theres data in local storage, show wish list // on click go to
        individual list
        {dataFromLocalStorage?.listId && (
          <div>
            <Wish
              listId={dataFromLocalStorage.listId}
              listName={dataFromLocalStorage.listName}
              listDate={dataFromLocalStorage.listDate}
              listPrivacy={dataFromLocalStorage.listPrivacy}
              listNotes={dataFromLocalStorage.listNotes}
            />
          </div>
        )}
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: { backgroundColor: "#DDDDDD" },
})
