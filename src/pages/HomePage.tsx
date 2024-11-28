import { MenuBar } from "../assets/MenuBar"
import { CreateWishList } from "../components/createWishListForm/CreateWishList"
import { WishList } from "../components/wishList/WishList"
import * as stylex from "@stylexjs/stylex"
import { CreateWishListButton } from "../components/createWishListForm/CreateWishListButton"
import { useState } from "react"
import { WishListType } from "src/types"
import { Wish } from "../components/wishes/Wish"
import { useNavigate } from "react-router-dom"
import { tokens } from "../tokens.stylex"

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
  const navigate = useNavigate()

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
      <div {...stylex.props(styles.wishes)}>
        <CreateWishListButton
          onClickFn={() => {
            navigate("/createwishlist")
          }}
        />

        {dataFromLocalStorage?.listId && (
          <div
            {...stylex.props(styles.wishesContainer)}
            onClick={() => {
              navigate(`/wishlist/${dataFromLocalStorage.listId}`)
            }}
          >
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
  base: {
    backgroundColor: "#DDDDDD",
    // display: "flex",
    // flexDirection: "column",
  },
  wishes: {
    backgroundColor: tokens.blue,
    // display: "grid",
    // gridTemplateRows: "10rem",
    display: "flex",

    // flexDirection: "row",
    // width: "100%",
    gap: "1rem",
    // flexShrink: 0,
    // flexWrap: "nowrap",
  },
  wishesContainer: {
    width: "10rem",
  },
})
