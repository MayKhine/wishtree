import { WishList } from "../components/wishList/WishList"
import { WishListType } from "src/types"
import { useParams } from "react-router-dom"
import { MenuBar } from "../assets/MenuBar"
import * as stylex from "@stylexjs/stylex"
import { Button } from "../assets/Button"
import { tokens } from "../tokens.stylex"
import { PopUp } from "../assets/PopUp"
import { useState } from "react"
import { NewWishItemForm } from "../components/wishes/NewWishItemForm"

type WishListPageType = {
  wishListData?: WishListType
}
export const WishListPage = ({ wishListData }: WishListPageType) => {
  const { wishlistid } = useParams<{ wishlistid: string }>()
  const [togglePopUp, setTogglePopUp] = useState(false)
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

  const addANewWish = () => {
    console.log("Add a new wish to this list: ", testData.listId)
    setTogglePopUp(!togglePopUp)
  }
  return (
    <div>
      <MenuBar />
      <div>
        <h2> {testData.listName} </h2>
      </div>
      <div {...stylex.props(styles.newWishContainer)}>
        <Button text="+ A new wish" onClickFn={addANewWish} />
        {togglePopUp && (
          <PopUp>
            <NewWishItemForm
              listId={testData.listId}
              togglePopUp={() => {
                console.log("what is toggle popup ", togglePopUp)
                setTogglePopUp(!togglePopUp)
              }}
            />
          </PopUp>
        )}
      </div>

      <WishList data={testData} />
    </div>
  )
}

const styles = stylex.create({
  base: { backgroundColor: "gray" },
  newWishContainer: {
    backgroundColor: tokens.blue,
    display: "flex",
    flexDirection: "row",
    // justifyContent: "flex-end",
    // width: "60rem",
    // paddingRight: "1rem",
    paddingLeft: "1rem",
  },
})
